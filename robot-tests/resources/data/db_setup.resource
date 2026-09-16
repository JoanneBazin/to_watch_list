*** Settings ***
Library    RequestsLibrary

*** Variables ***
${BASE_URL}         http://localhost:3000

*** Keywords ***
Clean User In Db
    [Arguments]    ${email}
    POST    ${BASE_URL}/api/test/clean-user    json={"email": "${email}"}
    Status Should Be    200    ${response}

Create User In Db
    ${response}=    POST    ${BASE_URL}/api/test/create-user
    Status Should Be    200    ${response}
    RETURN    ${response.json()}
