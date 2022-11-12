from transformers import SummarizationPipeline, AutoModelForSeq2SeqLM
from lib.ModelLocalCache import loadModel

defaultModelName="facebook/bart-large-cnn"
# other options: google/pegasus-xsum facebook/bart-large-cnn

class Summarizer:
    def __init__(self, modelName=defaultModelName, device="cpu"):
        self.modelName = modelName
        self.device = device
        tokenizer, model = loadModel(modelName, modelLoader=AutoModelForSeq2SeqLM, device=device)
        self.tokenizer = tokenizer
        self.model = model
        self.pipe = SummarizationPipeline(model=model, tokenizer=tokenizer, device=0)

    def summarize(self, input, min_length=150, max_length=200):
        result = self.pipe(input, max_length=max_length, min_length=min_length, do_sample=False)
        return result[0]['summary_text']

    def _textSpliter(self, input, batchSize=1000):
        idx = 0
        inputsTokens = self.tokenizer.encode(input, return_offsets_mapping=True, max_length=99999, truncation=False)
        batches = []
        while idx < len(inputsTokens):
            batch = inputsTokens[idx:idx+batchSize]
            size = len(batch)
            res = {"batch":self.tokenizer.decode(batch,skip_special_tokens=True), "size":size}
            batches.append(res)
            if idx + batchSize > len(inputsTokens):
                break
            idx += (batchSize-40) # make sure some overlapping
        return batches