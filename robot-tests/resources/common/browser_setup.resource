*** Settings ***
Library    Browser
Resource   ../../variables/common.robot

*** Keywords ***
Open Browser Instance
    New Browser     chromium    headless=${HEADLESS}

Close Browser Instance
    Close Browser

Open New Context And Page
    [Arguments]     ${url}=${BASE_URL}
    New Context
    New Page        ${url}

Close Current Context
    Close Context

Open New Page
    [Arguments]     ${url}=${BASE_URL}
    New Page        ${url}

Close Current Page
    Close Page