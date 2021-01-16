export const schema = {
    "models": {
        "Singer": {
            "name": "Singer",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "partysessionID": {
                    "name": "partysessionID",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Singers",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "byPartySession",
                        "fields": [
                            "partysessionID"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "PartySession": {
            "name": "PartySession",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "city": {
                    "name": "city",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "sessionStartTime": {
                    "name": "sessionStartTime",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "sessionState": {
                    "name": "sessionState",
                    "isArray": false,
                    "type": {
                        "enum": "SessionState"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "genreCode": {
                    "name": "genreCode",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "singers": {
                    "name": "singers",
                    "isArray": true,
                    "type": {
                        "model": "Singer"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "partysessionID"
                    }
                }
            },
            "syncable": true,
            "pluralName": "PartySessions",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "fields": [
                            "city",
                            "sessionStartTime"
                        ],
                        "name": "cityByStartTime",
                        "queryField": "partySessionCityByStartTime"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "SessionState": {
            "name": "SessionState",
            "values": [
                "CREATING",
                "INPROGRESS",
                "ENDED"
            ]
        }
    },
    "nonModels": {},
    "version": "f81d56691d3705c1d3715b594c2f3789"
};