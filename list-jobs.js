const cds = require('@sap/cds');
const JobSchedulerClient = require('@sap/jobs-client');

cds.connect().then(async () => {
    const vcap = JSON.parse(process.env.VCAP_SERVICES || '{}');
    const jobSchedulerCreds = vcap.jobscheduler
        ? vcap.jobscheduler[0].credentials
        : null;

    if (!jobSchedulerCreds) {
        console.error('Job Scheduling service is not bound. Run with: cds bind -2 job-s && node list-jobs.js (via cds bind exec, or ensure VCAP_SERVICES is set)');
        process.exit(1);
    }

    const scheduler = new JobSchedulerClient.Scheduler({
        url: jobSchedulerCreds.url
    });

    scheduler.fetchAllJobs({}, (err, result) => {
        if (err) {
            console.error('Error fetching jobs:', err);
            process.exit(1);
        }
        console.log('Raw result:');
        console.log(JSON.stringify(result, null, 2));
        process.exit(0);
    });
});
