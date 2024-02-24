async function formSubmit(e) {
    e.preventDefault();
    const input = document.querySelector('input');
    console.log(input.value);

    var response = '';
    const responseTag = document.getElementById('response');
    responseTag.innerHTML = 'loading a response...';
    responseTag.classList = '';
    const threshold = 0.5;

    await toxicity.load(threshold).then(async model => {
        const sentences = [input.value];

        await model.classify(sentences).then(predictions => {
            console.log(predictions);
            var toxic = false;
            predictions.forEach(p => {
                if (p.results[0].match) {
                    response += p.label + '\n ';
                    toxic = true;
                }
            });
            if (!toxic) {
                response += 'No toxic content detected';
                responseTag.classList.add('nonToxic');
                responseTag.innerHTML = response;
                return;
            }
            else{
                responseTag.classList.add('toxic');
                responseTag.innerText = 'Your message contains: \n' + response;
            }
            
            
        });

    });
}
