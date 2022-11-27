import { React, useEffect, useState } from 'react';
import Dropdown from "./Dropdown";

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

const AnalyzeArticle = () => {
    const [response, setResponse] = useState(undefined);
    const [selectedOption, setSelectedOption] = useState(undefined);

    const {
        device,
        setDevice,
        analyze,
        setAnalyze,
        label,
        setLabel,
        labelList,
        setLabelList,
        article,
        setArticle,
    } = useArticleAnalysis({ });

    const handleAnalyze = (event) => {
        event.preventDefault();
        
        if (analyze != null && device != null) {
            if (analyze === 'summarizer') {
                SummarizeArticle({ article, device });
            } else {
                if (selectedOption == null || selectedOption == '') {
                    ClassifyArticle({ device, article });
                } else {
                    ClassifyArticleWithLabel({ device, selectedOption, article });
                }
            }
        }    
    };

    const selectLabel = (event) => {
        setSelectedOption(event.value);
    }

    const addLabel = (event) => {
        const size = labelList.length;
        labelList[size] = {label: `${label}`, value: `${label}`}
    };

    async function SummarizeArticle({ device, article }) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ article: `${article}`})
        }    
        fetch(`${SERVER_HOST}/api/summarizer/${device}`, requestOptions)
        .then(response => response.json())
        .then(result => setResponse(result['summary']))
        .catch(error => JSON.stringify({ error: error}));
    }
    
    async function ClassifyArticleWithLabel({ device, selectedOption, article }) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ article: `${article}`, label: `${selectedOption}`})
        }
        fetch(`${SERVER_HOST}/api/classifier/binary/${device}`, requestOptions)
        .then(response => response.json())
        .then(result => setResponse(result['classification']))
        .catch(error => JSON.stringify({ error: error}));
    }
    
    async function ClassifyArticle({ device, article }) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ article: `${article}`, labels: JSON.stringify(labelList) })
        }
        fetch(`${SERVER_HOST}/api/classifier/general/${device}`, requestOptions)
        .then(response => response.json())
        .then(result => setResponse(result['classification']))
        .catch(error => JSON.stringify({ error: error}));
    }

    return (
        <>
            <div className='analyze-form-container'>
                <form onSubmit={handleAnalyze}>
                    <h2>Paste an article for analyzing to summarize</h2>
                    <table className="analyze-form-tbl">
                        <tbody>
                            <tr>
                                <td>
                                    Choose device:
                                    <select id="device" name="device" onChange={(event) => setDevice(event.target.value)}>
                                        <option value="cuda">CUDA</option>
                                        <option value="cpu">CPU</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Choose analysis method:
                                    <select id="analyzeMethod" name="analyzeMethod" onChange={(event) => setAnalyze(event.target.value)}>
                                        <option value="summarizer">Summarizer</option>
                                        <option value="classifier">Classifier</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Dropdown placeHolder="Select label..." options={labelList} onChange={selectLabel}/>
                                </td>
                            </tr>
                            <tr id="classifyLabelInput">
                                <td>
                                    Add Label:
                                    <input type="text" id="classifyLabel" onChange={(event) => setLabel(event.target.value)}></input>
                                    <button onClick={addLabel}>Add</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Article:</td>
                            </tr>
                            <tr>
                                <td><textarea name="article" onChange={(event) => setArticle(event.target.value)}  rows={10} cols={80} /></td>
                            </tr>
                            <tr>
                                <td><button type="submit" className="submit" value={response}>Analyze</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <h2>Analyzing Results</h2>
                        <textarea className="analysisResults" value={response} readOnly rows={10} cols={80}></textarea>
                    </div>
                </form>
            </div>
        </>
    )

}

export const useArticleAnalysis = ({ defaults }) => {
    const [device, setDevice] = useState(defaults?.device ? defaults.device : 'cuda');
    const [analyze, setAnalyze] = useState(defaults?.device ? defaults.device : 'summarizer');
    const [label, setLabel] = useState(defaults?.device ? defaults.device : 'economy');
    const [article, setArticle] = useState(defaults?.device ? defaults.device : 'sample article');
    const [labelList, setLabelList] = useState(undefined);

    useEffect(() => {
        fetch(`${SERVER_HOST}/api/classifier/labels`)
        .then(response => response.json())
        .then(data => setLabelList(data['labels']))
    }, []);

    return {
        device,
        setDevice,
        analyze,
        setAnalyze,
        label,
        setLabel,
        labelList,
        setLabelList,
        article,
        setArticle,
    }
}

export default AnalyzeArticle;