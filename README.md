# d3-timeline
d3v4 Timeline

I built this timeline to display my work history which has been an overlapping mess making my resume dates look practically incomprehensible.

Check out these other great d3 timelines. Neither of these fit my immediate needs hopefully one of these three will suit yours. Happy coding! 😆

* [https://github.com/jiahuang/d3-timeline](https://github.com/jiahuang/d3-timeline)

* [https://github.com/commodityvectors/d3-timeline](https://github.com/commodityvectors/d3-timeline)

---

## Install

__npm__
```sh
$ npm install
```

## Usage

Edit `jobhistory` with your own start date, end date, and color of the line (hex format), default is black \#000

```javascript
var jobhistory = {
	"timeline": "one",
	"children": [
		{
			"startDate": "2012-08",
			"endDate": "present",
      "color": "#000000",
		}
};
```

External JSON and Excel support for using TSV or CSV coming soon.

## Contributing

Please feel free to contribute, I made this as a

## License
[MIT License](LICENSE)
