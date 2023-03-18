// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.16 <0.9.0;

contract Account{
    
    constructor(){
        setPatientInfo("",0,false);
        setDoctorInfo("",0,false);
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
        bool created;
        address[] concernPatient;
    }

    mapping(address => patient) patientInfo;
    mapping(address => doctor) doctorInfo;
    address[] doctorList;

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
        patientInfo[owner].created = true;
    }

    function getDoctorInfo() public view returns (string memory, uint, address[] memory){
        
        address owner = msg.sender;
        
        return (doctorInfo[owner].name,doctorInfo[owner].age,doctorInfo[owner].concernPatient);
    }

    function setDoctorInfo(string memory _name,uint _age, bool _created) internal{
        
        doctor memory tempDoctor;
        tempDoctor.name = _name;
        tempDoctor.age = _age;
        tempDoctor.created = _created;
        doctorInfo[msg.sender] = tempDoctor;
    }

    function editDoctorInfo(string memory _name,uint _age) public{
        address owner = msg.sender;
        doctorInfo[owner].name = _name;
        doctorInfo[owner].age = _age;
        doctorInfo[owner].created = true;
        doctorList.push(owner);
    }

    
}