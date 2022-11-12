# text-analyzer-cli

## Prerequisite

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

```bash
python test_classifier.py
```

## Clear Cache
~/.cache/huggingface/
