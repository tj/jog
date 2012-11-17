
0.7.1 / 2012-11-17 
==================

  * fix bug in FileStore#stream() with no options

0.7.0 / 2012-11-14 
==================

  * add `log.error(type, err)` support
  * add `log.error(type, { error: err })` support

0.6.0 / 2012-11-07 
==================

  * add preliminary --format support

0.5.1 / 2012-10-23 
==================

  * remove redis dependency.
  * remove unused deps

0.5.0 / 2012-10-11 
==================

  * add word support to `--map` and `--select`
  * fix path.exists was moved to fs.exists

0.4.0 / 2012-08-31 
==================

  * add --reduce. Closes #10

0.3.0 / 2012-04-15 
==================

  * Added `-j, --json` to output json

0.2.0 / 2012-04-10 
==================

  * Added `-w, --within <ms>`
  * Added: allow multiple `--level`, `--select`, and `--type` flags
  * Added `-t, --type <name>` flag
  * Changed `.msg` -> `.type`

0.1.0 / 2012-04-08 
==================

  * Added `-f, --ignore-eof` support to jog(1)

0.0.1 / 2010-01-03
==================

  * Initial release
