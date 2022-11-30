# text-analyzer-cli
Python web service based on Flask framework to analyze text with transformer models.

## Prerequisite
[Anaconda](https://docs.anaconda.com/anaconda/install/index.html) / [Miniconda](https://docs.conda.io/en/latest/miniconda.html)
 
### Setup

Miniconda may have write permission error when installing packages
```bash
conda env create --file environment.yml
conda activate env
```

Output current conda environment
```python
conda env export > environment.yml
```

```python
pip list --format=freeze > requirements.txt
```

## Usage

REST API currently provided in the web service

| Method | URI                                     | Message(JSON) format                                                        | Description                                                                |
| :---   | :---                                    | :---                                                                        | :---                                                                       |
| GET    | /api/classifier/labels                  | {}                                                                          | Get default list of labels for classification                              |
| POST   | /api/classifier/general/{device}        | { 'article' : 'string', 'labels' : { 'value': 'string', 'label': 'string' } | Classify the article to determine the possibilities for the label          |
| POST   | /api/classifier/binary/{device}/{label} | { 'article' : 'string', 'label' : 'string' }                                | Classify the article to determine the possibilities for each of the labels |
| POST   | /api/summarizer/{device}/{article}      | { 'article' : 'string' }                                                    | Summarize news articles and other documents                                |

Parameters:

| Parameter | Data Type    | Description                  |
| :---      | :---         | :---                         |
| device    | "cpu"/"cuda" | Switch between CPU/GPU on ML |
| label     | String       | Label for classification     |
| article   | String       | Article for analysis         |

## Test

Start web service
```python
python server/app.py
```

Invoke REST API with testing tool (i.e. Postman)
```
localhost:4000/api/classifier/general/cuda/article
```

## Build Docker file

Create a Docker local registry
```
docker run -d -p 5000:5000 --restart=always --name registry registry:2
```

Build docker image locally
```
docker build -f dockerfile -t text-analyzer-app .
```

## Clear Cache
Remove folders in ~/.cache/huggingface/
