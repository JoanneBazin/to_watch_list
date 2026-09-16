*** Settings ***
Library    RequestsLibrary
Resource   ../../variables/common.robot

*** Keywords ***
Clean User In Db
    [Arguments]    ${email}
    &{payload} =    Create Dictionary   email=${email}
    POST    ${API_BASE_URL}/test/clean-user    json=${payload}   expected_status=200

Create User In Db
    ${response}=    POST    ${API_BASE_URL}/test/create-user    expected_status=200
    RETURN    ${response.json()}
