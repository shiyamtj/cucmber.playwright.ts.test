module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/config/env.ts', 'src/steps/**/*.ts'],
    format: ['summary', 'progress-bar'],
    paths: ['src/features/**/*.feature'],
    parallel: 2,
  },
}
