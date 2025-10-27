'use strict';

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

function loadFile(relativePath) {
  const absolutePath = path.join(__dirname, relativePath);
  return fs.readFileSync(absolutePath, 'utf8');
}

function formatMonthYear(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return null;
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' });
  return formatter.format(date);
}

Handlebars.registerHelper('dateRange', function(startDate, endDate) {
  const start = formatMonthYear(startDate);
  const end = endDate ? formatMonthYear(endDate) : 'Present';
  if (!start && !end) return '';
  if (start && end) return `${start} - ${end}`;
  return start || end || '';
});

Handlebars.registerHelper('join', function(arr, sep) {
  if (!Array.isArray(arr)) return '';
  return arr.filter(Boolean).join(sep || ', ');
});

Handlebars.registerHelper('and', function(a, b) {
  return a && b;
});

Handlebars.registerHelper('or', function(a, b) {
  return a || b;
});

Handlebars.registerHelper('exists', function(v, options) {
  return (v !== undefined && v !== null && (typeof v !== 'string' || v.trim() !== '') && (!Array.isArray(v) || v.length > 0))
    ? options.fn(this)
    : options.inverse(this);
});

Handlebars.registerHelper('displayUrl', function(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    return (u.host + (u.pathname === '/' ? '' : u.pathname));
  } catch (e) {
    return url.replace(/^https?:\/\//, '');
  }
});

const template = Handlebars.compile(loadFile('resume.hbs'));
const style = loadFile('style.css');

module.exports.render = function render(resume) {
  const viewModel = {
    resume,
    style,
    basics: resume.basics || {},
    skills: resume.skills || [],
    work: resume.work || [],
    projects: resume.projects || [],
    education: resume.education || []
  };

  return template(viewModel);
};

