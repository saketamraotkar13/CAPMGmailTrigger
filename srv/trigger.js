const cds = require('@sap/cds');
const JobSchedulerClient = require('@sap/jobs-client');

// TODO: replace with the numeric jobId of 'triggeremailjob'
// (find it via the Job Scheduling dashboard or GET /scheduler/jobs)
const TRIGGER_EMAIL_JOB_ID = '7670720';

module.exports = cds.service.impl(function () {

    this.on('triggerEmailJob', async (req) => {
        const { to } = req.data;

        if (!to) {
            req.error(400, "Please provide a 'to' email address");
            return;
        }

        try {
            const vcap = JSON.parse(process.env.VCAP_SERVICES || '{}');
            const jobSchedulerCreds = vcap.jobscheduler
                ? vcap.jobscheduler[0].credentials
                : null;

            if (!jobSchedulerCreds) {
                req.error(500, "Job Scheduling service is not bound to this application");
                return;
            }

            const scheduler = new JobSchedulerClient.Scheduler({
                url: jobSchedulerCreds.url
            });

            const result = await new Promise((resolve, reject) => {
                scheduler.createJobSchedule(
                    {
                        jobId: TRIGGER_EMAIL_JOB_ID,
                        schedule: {
                            active: 'true',
                            description: `on-demand trigger for ${to}`,
                            time: 'now',
                            data: { to }
                        }
                    },
                    (err, res) => err ? reject(err) : resolve(res)
                );
            });

            return `Email job triggered for ${to}`;

        } catch (error) {
            console.error('Error triggering email job:', error);
            return `Error triggering email job: ${error.message}`;
        }
    });
});
