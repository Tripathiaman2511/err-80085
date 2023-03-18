// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.16 <0.9.0;

contract Account{
    
    constructor(){
        setPatientInfo("",0,false);
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
    mapping(address => patient) doctorInfo;

    function getPatientInfo() public view returns (string memory, uint, address[] memory, string[] memory){
        
        address owner = msg.sender;
        
        return (patientInfo[owner].name,patientInfo[owner].age,patientInfo[owner].concernDoctor,patientInfo[owner].dataHash);
    }

    function setPatientInfo(string memory _name,uint _age, bool _created) internal{
        
        patient memory tempPatient;
        tempPatient.name = _name;
        tempPatient.age = _age;
        tempPatient.created = _created;
        patientInfo[msg.sender] = tempPatient;
    }

    function editPatientInfo(string memory _name,uint _age) public{
        address owner = msg.sender;
        patientInfo[owner].name = _name;
        patientInfo[owner].age = _age;
    }

    // function getDoctorInfo() public view returns (string memory, uint, address[] memory, string[] memory){
        
    //     address owner = msg.sender;
        
    //     return (patientInfo[owner].name,patientInfo[owner].age,patientInfo[owner].concernDoctor,patientInfo[owner].dataHash);
    // }

    // function setDoctorInfo(string memory _name,uint _age, bool _created) internal{
        
    //     patient memory tempPatient;
    //     tempPatient.name = _name;
    //     tempPatient.age = _age;
    //     tempPatient.created = _created;
    //     patientInfo[msg.sender] = tempPatient;
    // }

    // function setDoctorInfo(string memory _name,uint _age) public{
    //     setDoctorInfoIntern(_name,_age,true);
    // }
}