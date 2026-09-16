*** Settings ***
Library    Browser

*** Variables ***
${DASHBOARD_NAV}         [data-testid="dashboard-nav"]
${DASHBOARD_SECTION}     [data-testid="dashboard-section"]
${OPEN_PROFILE_MENU}     [data-testid="open-profile-menu"]

*** Keywords ***
Dashboard Is Displayed
    [Arguments]     ${name}
    Get Element States    ${DASHBOARD_NAV}      contains    visible
    Get Element States    ${DASHBOARD_SECTION}  contains    visible
    Get Text              ${OPEN_PROFILE_MENU}  contains    ${name}

Open Header Menu
    Click   ${OPEN_PROFILE_MENU}