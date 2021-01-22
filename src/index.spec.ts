import { logger } from './index';

jest.mock('configuration-master', () =>
{
	return {
		loadConfig: () => { /* do nothing function */ },
		logging: {
			level: "debug",
			consoleEnabled: true,
			piiFilter: [
				"hostname",
				"password"
			],
			redactPrefix: ["request[*]."],
			redactRemove: false
		}
	};
});

describe("common logging", () =>
{
	it("Test common logging with redact", async () =>
	{
		const log = logger({ id: Math.floor(Math.random() * Math.floor(10000)) });

		expect(log).not.toBeNull();
		expect(log.trace).not.toBeNull();
		expect(log.warn).not.toBeNull();
		expect(log.error).not.toBeNull();
		expect(log.debug).not.toBeNull();
		expect(log.fatal).not.toBeNull();
	});

	it("Test common logging without passing child", async () =>
	{
		const log = logger();

		expect(log).not.toBeNull();
		expect(log.trace).not.toBeNull();
		expect(log.warn).not.toBeNull();
		expect(log.error).not.toBeNull();
		expect(log.debug).not.toBeNull();
		expect(log.fatal).not.toBeNull();
	});

});
