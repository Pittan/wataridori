<h1 align="center">
  <br>Wataridori<br>
</h1>

<h4 align="center">
  🐦 CLI for Importing emoji to esa.io.
</h4>

<p align="center">
  <a href="https://github.com/Pittan/wataridori/actions">
    <img src="https://github.com/Pittan/wataridori/workflows/Node%20CI/badge.svg"
      alt="Mac OSX & Linux CI Status" />
  </a>
  
  <a href="https://github.com/Pittan/wataridori/blob/master/LICENSE">
    <img src="https://badgen.net/github/license/Pittan/wataridori" alt="GitHub License">
  </a>
</p>

<div align="center">
  <h4>
    <a href="#Installation">Install</a> |
    <a href="#how-to-use">How to use</a>
  </h4>
</div>

<div align="center">
  <sub>Built with ❤︎ by
  <a href="https://pittankopta.net">Amon Keishima</a>
</div>

<br>
wataridori is a awesome CLI tool for importing emojis to <a href="http://esa.io">esa</a>.

Want more features? Please [open an issue](https://github.com/Pittan/wataridori/issues/new) or send pull request!

## Installation

```shell script
$ npm install -g wataridori
```

## How to use

### Upload single emoji
```shell script
# It will upload emoji as awesome
wataridori awesome.png -t XXXXXXX -a XXXXXXXXXX
```

### Upload emojis inside directory
```shell script
# list emoji
$ ls emojis
total 8
drwxr-xr-x   3 pittan  1140054205    96  9 29 18:35 .
drwx------+ 34 pittan  1140054205  1088  9 29 18:35 ..
-rw-r--r--@  1 pittan  1140054205  2292  9 26 19:15 awesome.png
-rw-r--r--@  1 pittan  1140054205  2292  9 26 19:15 kanzen_riaki.png

# Upload it...
wataridori emojis -t XXXXXXX -a XXXXXXXXXX
```

## License

MIT © [Amon Keishima](https://pittankopta.net)
