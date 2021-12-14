const communityWrapper = document.querySelector('.community');
const communityMenu = document.querySelector('.community-menu');

const archiveWrapper = document.querySelector('.archive');
const archiveMenu = document.querySelector('.archive-menu');
const archiveMenuLable = document.querySelector('.archive-menu-label')

//community - notice, Q&A
communityWrapper.addEventListener('mouseover', () => {
    communityMenu.classList.remove('hidden');
})

communityWrapper.addEventListener('mouseout', () => {
    communityMenu.classList.add('hidden');
})
//archive - lookbook, video
archiveWrapper.addEventListener('mouseover', () => {
    archiveMenu.classList.remove('hidden');
    archiveWrapper.classList.add('align-items-row');
    archiveMenuLable.classList.add('available-margin');
})

archiveWrapper.addEventListener('mouseout', () => {
    archiveMenu.classList.add('hidden');
    archiveWrapper.classList.remove('align-items-row');
    archiveMenuLable.classList.remove('available-margin');
})