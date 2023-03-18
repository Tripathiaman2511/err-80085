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
        string description;
        address[] concernPatient;
    }

    struct data {

        string enc_hash;
        string description;
        address owner;
        
    }


    mapping(address => patient) patientInfo;
    mapping(address => doctor) doctorInfo;
    mapping(string => data) dataInfo;

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

    function getDoctorInfo() public view returns (string memory, uint, address[] memory,string memory){
        
        address owner = msg.sender;
        
        return (doctorInfo[owner].name,doctorInfo[owner].age,doctorInfo[owner].concernPatient,doctorInfo[owner].description);
    }

    function setDoctorInfo(string memory _name,uint _age, bool _created) internal{
        
        doctor memory tempDoctor;
        tempDoctor.name = _name;
        tempDoctor.age = _age;
        tempDoctor.created = _created;
        doctorInfo[msg.sender] = tempDoctor;
    }

    function editDoctorInfo(string memory _name,uint _age, string memory _description) public{
        address owner = msg.sender;
        doctorInfo[owner].name = _name;
        doctorInfo[owner].age = _age;
        doctorInfo[owner].created = true;
        doctorInfo[owner].description = _description;
        doctorList.push(owner);
    }
    
     function add_records(string memory _hash, string memory _description) public {
        
        address _owner = msg.sender;

        data memory d;
        d.enc_hash = _hash;
        d.description = _description;
        d.owner = _owner;
        dataInfo[d.enc_hash] = d;

        patientInfo[_owner].dataHash.push(d.enc_hash);
        // return _id;
    }

    function getDoctors() public view returns (string[] memory,uint[] memory,string[] memory,address[] memory){
        uint n = doctorList.length;
        string[] memory _name = new string[](n);
        uint[] memory _age = new uint[](n);
        string[] memory _description= new string[](n);
        address[] memory _address = new address[](n);

        for(uint i=0;i<n;i++){
            doctor memory tempDoctor = doctorInfo[doctorList[i]];
            if(tempDoctor.created){
                _name[i] = tempDoctor.name;
                _age[i] = tempDoctor.age;
                _description[i] = tempDoctor.description;
                _address[i] = doctorList[i];

            }

        }
        return (_name,_age,_description,_address);
    }

    function getRecords() public view returns (string[] memory,string[] memory){
        uint n = patientInfo[msg.sender].dataHash.length;
        string[] memory _des = new string[](n);
        for(uint i;i<n;i++){
            _des[i] = dataInfo[patientInfo[msg.sender].dataHash[i]].description;
        }
        return (patientInfo[msg.sender].dataHash,_des);
    }
}