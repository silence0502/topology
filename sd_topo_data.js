var topoData = {
    "nodes": [{
        "id": "CMZJ::E2CVPN-000.01",
        "name": "E2CVPN",
        "desc": "Represents E2CVPN",
        "displayType": "cfs",
    }, {
        "id": "CMZJ::CPE-000.01",
        "name": "CPE",
        "desc": "Represents CPE",
        "displayType": "rfs",
    }, {
        "id": "CMZJ::SubNet30-000.00",
        "name": "SubNet30",
        "desc": "Represents a 30 subnet",
        "displayType": "rfs",
    }, {
        "id": "CMZJ::SubNet16-000.00",
        "name": "SubNet16",
        "desc": "Represents a 16 subnet",
        "displayType": "rfs",
    }, {
        "id": "CMZJ::SubNet24-000.00",
        "name": "SubNet24",
        "desc": "Represents a 24 subnet",
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
    }]
}