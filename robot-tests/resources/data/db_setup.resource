*** Settings ***
Library    RequestsLibrary

Variables   ../..variables/common.robot

*** Keywords ***
Clean User In Db
    [Arguments]    ${email}
    POST    ${API_BASE_URL}/test/clean-user    json={"email": "${email}"}
    Status Should Be    200    ${response}

Create User In Db
    ${response}=    POST    ${API_BASE_URL}/test/create-user
    Status Should Be    200    ${response}
    RETURN    ${response.json()}
