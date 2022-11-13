import time
import torch
from os.path import exists
from transformers import AutoModel, AutoTokenizer
from pathlib import Path

cacheDir = "./cache/"
Path(cacheDir).mkdir(parents=True, exist_ok=True)

def loadModel(modelName, tokenizerLoader=AutoTokenizer, modelLoader=AutoModel, device="cpu"):
    s = time.time()
    localFileName = modelName.replace("/", "@")
    localCachePath = f"{cacheDir}{localFileName}_{device}"

    if exists(localCachePath):
        print(f"Loading from cache: {localCachePath}")
        tokenizer = tokenizerLoader.from_pretrained(localCachePath)
        if device == "cuda":
            model = modelLoader.from_pretrained(localCachePath, torch_dtype=torch.bfloat16).to(device)
        else:
            model = modelLoader.from_pretrained(localCachePath)
    else:
        print(f"Downloading {modelName} from online")
        tokenizer = tokenizerLoader.from_pretrained(f"{modelName}")
        if device == "cuda":
            model = modelLoader.from_pretrained(f"{modelName}", torch_dtype=torch.bfloat16).to(device)
        else:
            model = modelLoader.from_pretrained(f"{modelName}")

        tokenizer.save_pretrained(localCachePath)
        model.save_pretrained(localCachePath)

    print(f"Loaded model {modelName} in {round(time.time()-s, 1)}s")
    return tokenizer, model