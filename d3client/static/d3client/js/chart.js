function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var REQUEST = {
  getKeys: function(key) {
    var csrftoken = getCookie('csrftoken');
    var d = JSON.stringify({
      'key': key
    });
    return $.ajax({
      headers: {
        'X-CSRFToken': getCookie('csrftoken')
      },
      url: 'get-all-keys',
      method: 'POST',
      contentType: 'application/json; charset=utf-8',
      data: d
    });
  }
};
var CREATEELEMENT = {
  populateSelect: function(d) {
    d = d.sort();
    opt = "";
    opt += '<option value="' + 0 + '">' + '--please select--' + '</option>';
    $.each(d, function(i, v) {
      opt += '<option value="' + v + '">' + v + '</option>';
    });
    return opt;
  }
}

var CHART = {
  formatData: function(data) {
    var tsv = JSON.parse(data).split('\n');
    $.each(tsv, function(i, o) {
      tsv[i] = o.split('\t')
    });
    tsv.splice(-1, 1);
    tsv.splice(0, 1);
    return tsv;
  },
  lineChart: function(svg, data) {
    var self = this;
    var data = self.formatData(data);
    console.log(data)
    var parseTime = d3.timeParse("%d-%b-%y");

    $.each(data, function(i,v){
      v.date = parseTime(v[0]);
      v.close = v[1];
    });
    console.log(data);
    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
      },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // parse the date / time


    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
      .x(function(d) {
        // console.log('x',d);
        return x(d.date);
      })
      .y(function(d) {
        // console.log('y',d);
        return y(d.close);
      });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));
    y.domain([0, d3.max(data, function(d) {
      return d.close;
    })]);
    // Add the valueline path.
    // console.log(data);
    svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
      .call(d3.axisLeft(y));
  }
}

$(function() {
  /*---------------index.html----------------*/
  //  page submit
  $('#data').submit(function() {
    var options = {
      url: 'file-upload',
      type: 'post',
      success: function(d) {
        alert(d)
      }
    }
    $(this).ajaxSubmit(options);
    return false;
  });
});
