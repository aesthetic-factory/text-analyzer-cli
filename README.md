# text-analyzer-cli
Interactive CLI using transformer models
## Prerequisite
Install [Anaconda](https://docs.anaconda.com/anaconda/install/index.html)
 
Create a new environment
### CPU Only
```bash
conda install -c conda-forge transformers[torch] -y
```

### CUDA
```bash
conda install pytorch torchvision torchaudio pytorch-cuda=11.7 -c pytorch -c nvidia -y
conda install -c conda-forge transformers -y
```
## Usage
TODO

## Test
### Classifier
```bash
python test_classifier.py
```
### Summarizer
```bash
python test_summarizer.py
```

## Clear Cache
Remove folders in ~/.cache/huggingface/
