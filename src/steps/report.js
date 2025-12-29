const report = require('multiple-cucumber-html-reporter');
const fs = require('fs-extra');
const path = require('path');

const reportDir = path.join(__dirname, '..', '..', 'reports');

function getBrowserVersion(browserType) {
    const versionFilePath = path.join(reportDir, `${browserType.toLowerCase()}.version`);
    if (fs.existsSync(versionFilePath)) {
        return fs.readFileSync(versionFilePath, 'utf8').trim();
    }
    return 'N/A';
}

const customData = [
    { label: 'Project', value: 'Cucumber Playwright Test' },
    { label: 'Release', value: '1.0.0' },
    { label: 'Execution Start Time', value: new Date().toISOString() }
];

const chromiumVersion = getBrowserVersion('chromium');
if (chromiumVersion !== 'N/A') {
    customData.push({ label: 'Chromium Version', value: chromiumVersion });
}

const firefoxVersion = getBrowserVersion('firefox');
if (firefoxVersion !== 'N/A') {
    customData.push({ label: 'Firefox Version', value: firefoxVersion });
}

const webkitVersion = getBrowserVersion('webkit');
if (webkitVersion !== 'N/A') {
    customData.push({ label: 'Webkit Version', value: webkitVersion });
}

report.generate({
    jsonDir: './reports/json/',
    reportPath: './reports/html/',
    reportName: 'Playwright Cucumber Report',
    pageTitle: 'Test Report',
    displayDuration: true,
    metadata: {
        browser: {
            name: 'multiple', // This is a placeholder as actual versions are in customData
            version: 'See custom data' 
        },
        device: 'Local test machine',
        platform: {
            name: process.platform
        }
    },
    customData: {
        title: 'Run info',
        data: customData
    }
});
