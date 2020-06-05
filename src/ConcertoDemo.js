import React, { Component } from "react";
import { ConcertoForm } from "@accordproject/concerto-ui";

class ConcertoDemo extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  

safeStringify(jsonObject) {
  try {
    if (typeof jsonObject === 'object') {
      return JSON.stringify(jsonObject, null, 2);
    }
    return JSON.stringify(JSON.parse(jsonObject), null, 2);
  } catch (err){
    return jsonObject;
  }
};


setJsonValue(value) {
    this.setState(value);
}

render() {
    
    const type = 'test.Address';
    const options = {
      includeOptionalFields: true,
      includeSampleData: 'sample',
      updateExternalModels: true,
      hiddenFields: [
        'org.accordproject.base.Transaction.transactionId',
        'org.accordproject.cicero.contract.AccordContract.contractId',
        'org.accordproject.cicero.contract.AccordClause.clauseId',
        'org.accordproject.cicero.contract.AccordContractState.stateId',
      ],
    };
    const model = `
    namespace test     
    enum Country {
        o USA
        o UK
        o France
        o Sweden
    }
        
    concept Address {
        o String street
        o String city
        o String zipCode
        o Country country
    }
    `;
    
    return <div style={{ padding: '10px' }}>
            <ConcertoForm 
                readOnly={false} 
                models={[model]} 
                options = {options}
                type={type} 
                json={this.state}
                onModelChange={({ types, json }) => {
                    console.log(type," = ", json);
                   // setJsonValue(safeStringify(json));
                   // return action("model changed")(({ types, json }));
                }}
                onValueChange={(json) => {
                    console.log("json", json);
                   // setJsonValue(safeStringify(json));
                   // return action("value changed")(json);
                }}
            />
        </div>
    }
}

export default ConcertoDemo;