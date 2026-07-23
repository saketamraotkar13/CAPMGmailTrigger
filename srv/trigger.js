const cds = require('@sap/cds');
const JobSchedulerClient = require('@sap/jobs-client');

// The job is looked up by name at runtime instead of hardcoding its numeric ID,
// so this code doesn't need edits when redeployed to a different subaccount.
const TRIGGER_EMAIL_JOB_NAME = 'triggeremailjob';

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

            // Look up the job by name to get its current jobId
            const job = await new Promise((resolve, reject) => {
                scheduler.fetchJob(
                    { name: TRIGGER_EMAIL_JOB_NAME },
                    (err, res) => err ? reject(err) : resolve(res)
                );
            });

            const jobId = job.jobId || job._id;

            if (!jobId) {
                req.error(500, `Could not find job '${TRIGGER_EMAIL_JOB_NAME}'`);
                return;
            }

            const result = await new Promise((resolve, reject) => {
                scheduler.createJobSchedule(
                    {
                        jobId,
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