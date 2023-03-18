// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.16 <0.9.0;

contract Account{
    
    constructor(){
        setPatientInfo("",0);
    }
    struct patient{
        string name;
        uint age;
        bool created;
        address[] concernDoctor;
        string[] dataHash;
    }

    struct doctor{
        string name;
        uint age;
        address[] concernPatient;
    }

    mapping(address => patient) patientInfo;

    function getPatientInfo() public view returns (string memory, uint, address[] memory, string[] memory){
       
        address owner = msg.sender;
        
        return (patientInfo[owner].name,patientInfo[owner].age,patientInfo[owner].concernDoctor,patientInfo[owner].dataHash);
    }

    function setPatientInfo(string memory _name,uint _age) public{
        
        patient memory tempPatient;
        tempPatient.name = _name;
        tempPatient.age = _age;
        patientInfo[msg.sender] = tempPatient;
    }


}