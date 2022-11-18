from flask import Flask, jsonify, request
from flask_cors import CORS

from Summarizer import Summarizer
from Classifier import Classifier


news_labels = ['stock market', 'finance', 'economy', 'science', 'politics', 'real estate', 'energy price', 'technology']
app = Flask(__name__, static_folder=None)
CORS(app)


@app.route("/api/query")
def query():
    return jsonify(
        response=True
    )


@app.route("/api/classifier/general/<device>", methods=['GET', 'POST'])
def classify_general(device):
    newsClassifier = Classifier(device=device)
    content = request.json
    results = newsClassifier.classifyGeneral(content['article'], news_labels, multiLabel=True)
    return jsonify(response=True,
                   classification=results)


@app.route("/api/classifier/binary/<device>/<label>", methods=['GET', 'POST'])
def classify_binary(device, label):
    newsClassifier = Classifier(device=device)
    content = request.json
    results = newsClassifier.classifyBinary(content['article'], label)
    return jsonify(response=True,
                   classification=results)


@app.route("/api/summarizer/<device>", methods=['GET', 'POST'])
def summarize(device):
    newSummarizer = Summarizer(device=device)
    content = request.json
    results = newSummarizer.summarize(content['article'])
    return jsonify(response=True,
                   summary=results)


if __name__ == '__main__':
    from waitress import serve
    serve(app, host='0.0.0.0', port=4000)
