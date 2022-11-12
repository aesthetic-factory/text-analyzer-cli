from transformers import ZeroShotClassificationPipeline, AutoModelForSequenceClassification
from lib.ModelLocalCache import loadModel

defaultModelName = "MoritzLaurer/DeBERTa-v3-large-mnli-fever-anli-ling-wanli"
# other options: "facebook/bart-large-mnli"

class Classifier:
    def __init__(self, modelName=defaultModelName, device="cpu"):
        self.modelName = modelName
        self.device = device
        tokenizer, model = loadModel(modelName, modelLoader=AutoModelForSequenceClassification, device=device)
        self.tokenizer = tokenizer
        self.model = model
        self.pipe = ZeroShotClassificationPipeline(model=model, tokenizer=tokenizer, device=0)

    def classifyBinary(self, input, label):
        candidateLabels = [f"not {label}", f"{label}"]
        result = self.pipe(input, candidateLabels, multi_label=False)
        return result['labels'], result['scores']

    def classifyGeneral(self, input, candidateLabels, multiLabel=False):
        result = self.pipe(input, candidateLabels, multi_label=multiLabel)
        return result['labels'], result['scores']