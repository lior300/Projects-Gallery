console.log('Starting up');

$(document).ready(initPage)

function initPage() {
  renderGalleryProjects()
}


function renderGalleryProjects() {
  var projects = GetgProjs()
  var projectsHTMLs = projects.map(getProjectsGalleryHTML)
  $('.profilesProjs').html(projectsHTMLs)
}


function getProjectsGalleryHTML(project) {
  return `
        <div class="col-md-4 col-sm-6 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onClick="onProject(${project.id})">
        <div class="portfolio-hover">
          <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
          </div>
        </div>
        <img class="img-fluid" src="img/portfolio/01-thumbnail.jpg" alt="">
        </a>
        <div class="portfolio-caption">
          <h4>${project.name}</h4>
          <p class="text-muted">${project.title}</p>
      </div>
    `
}

function onProject(idProject) {
  var project = getProjectById(idProject)
  var modalHTML = getProjectModalHTML(project)
  $('.modal-body').html(modalHTML)
}

function getProjectModalHTML(project) {
  return `
    <h2>${project.name}</h2>
    <p class="item-intro text-muted">${project.title}</p>
    <img class="img-fluid d-block mx-auto" src="img/portfolio/01-full.jpg" alt="">
    <p>${project.desc}</p>
    <ul class="list-inline">
      <li>Date: ${project.publishedAt}</li>
      <li>Category: ${project.labels.join(', ')}</li>
    </ul>
    <button class="btn btn-outline-warning" data-dismiss="modal" type="button">
    <i class="fa fa-times"></i>
    Close</button>
    <a class="btn btn-outline-primary" href="${project.url}" target="_blank">Project Link</a>
    `
}

function onSendMessage() {
  var email = $('.email-input').val()
  var subject = $('.subject-input').val()
  var message = $('.message-input').val()

  sendMessage(email, subject, message)
}
