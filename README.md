# text-analyzer-cli
Python web service based on Flask framework to analyze text with transformer models.

## Prerequisite
[Anaconda](https://docs.anaconda.com/anaconda/install/index.html) / [Miniconda](https://docs.conda.io/en/latest/miniconda.html)
 
### Setup

Miniconda may have write permission error when installing packages
```bash
conda env create --file environment.yml
conda activate ./env
```

Output current conda environment
```python
conda env export > environment.yml
```

## Usage

REST API currently provided in the web service

| Method | URI                                               | Description                                                                |
| :---   | :---                                              | :---                                                                       |
| GET    | /api/classifier/general/{device}/{article}        | Classify the article to determine the possibilities for the label          |
| GET    | /api/classifier/binary/{device}/{label}/{article} | Classify the article to determine the possibilities for each of the labels |
| GET    | /api/summarizer/{device}/{article}                | Summarize news articles and other documents                                |

Parameters:

| Parameter | Data Type    | Description                  |
| :---      | :---         | :---                         |
| device    | "cpu"/"cuda" | Switch between CPU/GPU on ML |
| label     | String       | Label for classification     |
| article   | String       | Article for analysis       |

## Test

Start web service
```python
python server/app.py
```

Invoke REST API with testing tool (i.e. Postman)
```
localhost:4000/api/classifier/general/cuda/article
```

## Clear Cache
Remove folders in ~/.cache/huggingface/
