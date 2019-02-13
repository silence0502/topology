var topoData = {
    "nodes": [{
        "id": "CMZJ::E2CVPN-000.01",
        "name": "E2CVPN",
        "desc": "Represents E2CVPN",
        "state": "ACTIVE",
        "displayType": "cfs",
    }, {
        "id": "CMZJ::CPE-000.01",
        "name": "CPE",
        "desc": "Represents CPE",
        "state": "ACTIVE",
        "displayType": "rfs",
    }, {
        "id": "CMZJ::SubNet30-000.00",
        "name": "SubNet30",
        "desc": "Represents a 30 subnet",
        "state": "ACTIVE",
        "displayType": "rfs",
    }, {
        "id": "CMZJ::SubNet16-000.00",
        "name": "SubNet16",
        "desc": "Represents a 16 subnet",
        "state": "PROVISIONED",
        "displayType": "rfs",
    }, {
        "id": "CMZJ::SubNet24-000.00",
        "name": "SubNet24",
        "desc": "Represents a 24 subnet",
        "state": "DESIGNED",
        "displayType": "rfs",
    }, {
        "id": "CMZJ::CPE-000.00",
        "name": "CPE",
        "desc": "Represents a 24 subnet",
        "state": "RESERVED",
        "displayType": "rfs",
    }],
    "links": [{
        "source": "CMZJ::E2CVPN-000.01",
        "target": "CMZJ::CPE-000.01",
    }, {
        "source": "CMZJ::E2CVPN-000.01",
        "target": "CMZJ::SubNet30-000.00",
    }, {
        "source": "CMZJ::SubNet30-000.00",
        "target": "CMZJ::SubNet16-000.00",
    }, {
        "source": "CMZJ::SubNet16-000.00",
        "target": "CMZJ::SubNet24-000.00",
    }, {
        "source": "CMZJ::SubNet24-000.00",
        "target": "CMZJ::CPE-000.00",
    }]
}