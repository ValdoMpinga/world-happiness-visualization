const YEARS = {
    '2015': 2015,
    '2016': 2016,
    '2017': 2017,
    '2018': 2018,
    '2019': 2019
};

const CHART_TYPE = {
    'pie': 'pie',
    'bar': 'bar',
    'scatter': 'scatter',
    'line': 'line',
    'bubble': 'bubble',
    'stackedBar': 'stackedBar',
}

const ROW_INDICES = {
    "Country": 0,
    'HappinessRank': 1,
    'HappinessScore': 2,
    'GDPerCapita': 3,
    'SocialSupport': 4,
    'HealthyLife': 5,
    "Freedom": 6,
    "Generosity": 7,
    "Corruption": 8,
    "Year": 9
};


module.exports = {
    YEARS, CHART_TYPE, ROW_INDICES
};
