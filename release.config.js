module.exports = {
  name: 'ui',
  pkgRoot: `dist/libs/ui`,
  tagFormat: `${version}-ui`,
  commitPaths: ['ui/*'],
  preset: 'conventionalcommits',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'docs', scope: 'README', release: 'patch' },
          { type: 'refactor', release: 'patch' },
          { type: 'fix', release: 'patch' },
          { type: 'style', release: 'patch' },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],

    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/exec',
      {
        prepareCmd: `VERSION=\${nextRelease.version} LIB_NAME=ui pnpm bump-version `,
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: `libs/ui/CHANGELOG.md`,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [`libs/ui/package.json`, `libs/ui/CHANGELOG.md`],
        message:
          `chore(release): ui` +
          '-v${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: `libs/ui/CHANGELOG.md`,
          },
        ],
      },
    ],
    '@semantic-release/npm',
    { extends: 'semantic-release-monorepo' },
  ],
};
