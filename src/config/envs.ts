import "dotenv/config"
import * as Joi from "joi";

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  SERVERS_NATS: string[];
}

const envSchema = Joi.object({
  PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  SERVERS_NATS:Joi.array().items(Joi.string()).required(),
})
  .unknown(true)

const { error, value } = envSchema.validate({
  ...process.env,
  SERVERS_NATS: process.env.SERVERS_NATS.split(',')
});

if (error) throw new Error(`Config Validation Error: ${error.message}`)

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseurl: envVars.DATABASE_URL,
  serversNats: envVars.SERVERS_NATS
}

