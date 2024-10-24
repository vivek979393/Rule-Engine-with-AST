import React, { useState } from 'react';
import axios from 'axios';
import './RuleEngine.css';
const RuleEngine = () => {
  const [rule, setRule] = useState('');
  const [data, setData] = useState({});
  const [result, setResult] = useState(null);

  const handleCreateRule = async () => {
    if (!rule) {
      alert("Please enter a rule string.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/rules/create_rule', { ruleString: rule });
      alert("Rule created successfully!");
    } catch (error) {
      console.error("Error creating rule:", error);
      alert("Failed to create rule.");
    }
  };

  const handleEvaluate = async () => {
    try {
        const astResponse = await axios.post('http://localhost:5000/api/rules/create_rule', { ruleString: rule });
        const ast = astResponse.data.ast; // Make sure to access the AST correctly

        const evaluationResponse = await axios.post('http://localhost:5000/api/rules/evaluate_rule', {
            ast,
            data,
        });

        console.log('Evaluation Response:', evaluationResponse.data); // Log the response
        setResult(evaluationResponse.data.result);
    } catch (error) {
        console.error('Error evaluating rule:', error.response ? error.response.data : error.message);
    }
};


  const handleDataChange = (e) => {
    try {
      setData(JSON.parse(e.target.value)); // Parse JSON input
    } catch (error) {
      console.error("Invalid JSON input:", error);
      alert("Please enter valid JSON.");
    }
  };

  return (
    <div class='container'>
        <input 
            type="text" 
            value={rule} 
            onChange={(e) => setRule(e.target.value)} 
            placeholder="Enter Rule" 
        />
        <button onClick={handleCreateRule}>Create Rule</button>
        <br />
        <input
            type="text"
            placeholder='{"age": 35, "department": "Sales", "salary": 60000, "experience": 3}'
            onChange={handleDataChange}
        />
        <button onClick={handleEvaluate}>Evaluate Rule</button>
        {result !== null && result !== undefined && <div>Result: {result.toString()}</div>}
    </div>
);

};

export default RuleEngine;
