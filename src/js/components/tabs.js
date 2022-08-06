document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.tab__btn').forEach(function(tabBtn) {
      tabBtn.addEventListener('click', function(event) {
        const path = event.currentTarget.dataset.path

        document.querySelectorAll('.tabs__block').forEach(function(tabsBlock) {
          tabsBlock.classList.remove('tab__content-active')
        })
        document.querySelector(`[data-target="${path}"]`).classList.add('tab__content-active')
      })
    })



    const btnOne = document.querySelector('.btn-js-one');
    const btnTwo = document.querySelector('.btn-js-two');
    const btnThree = document.querySelector('.btn-js-three');

    btnOne.addEventListener('click', function() {
        btnOne.classList.add('tab__btn-active');
        btnTwo.classList.remove('tab__btn-active');
        btnThree.classList.remove('tab__btn-active');
    })

    btnTwo.addEventListener('click', function() {
        btnTwo.classList.add('tab__btn-active');
        btnOne.classList.remove('tab__btn-active');
        btnThree.classList.remove('tab__btn-active');
    })

    btnThree.addEventListener('click', function() {
        btnThree.classList.add('tab__btn-active');
        btnOne.classList.remove('tab__btn-active');
        btnTwo.classList.remove('tab__btn-active');
    })
    
  })

