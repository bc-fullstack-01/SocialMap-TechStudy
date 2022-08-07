const bcrypt = require('bcrypt');
const { Post, Comment, Profile, User, Connection } = require('../models')

const about = [
    'Lorem ipsum a tellus consectetur taciti dolor sit egestas justo nisl, auctor ullamcorper feugiat nam eget ac rhoncus feugiat. per proin ac senectus massa rhoncus duis, metus sociosqu etiam orci laoreet potenti facilisis, potenti curabitur sagittis bibendum duis. ',
    'Eu sou bem legal!',
    ' Sou organizado, arrumo minha cama todas às manhãs e guardo meu pijama na gaveta certa. CD’s em ordem, livros lidos numa pilha, livros para ler em outra pilha. Tudo é assim. ',
    'I trust this answer. Can anyone give a link or clear explanation of why this works? Perhaps an example of how Math.',
    'Descubro novas paixões, mudo de opiniões, mas mantenho meus objetivos. Acho que isso é importante. Manter uma linha de ideais. Uma linha que você possa enxergar de longe e saber que um dia, você conhecerá o seu fim.',
    'Às vezes fico absorto, há momentos que sou engraçado. E um dos meus defeitos é deixar tudo para depois. Preocupo-me com minha saúde, faço exercícios físicos, mas não deixo de comer porcarias.'
]

const profile_img = [
    'https://s1.static.brasilescola.uol.com.br/be/conteudo/images/imagem-em-lente-convexa.jpg',
    'https://4maos.com.br/wp-content/uploads/2022/07/004dc630b3e5734a071177ce4df81f0e.jpg',
    'https://grandemente.net/wp-content/uploads/Fotos-para-Perfil-06.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn5oMGw6JFgPblg2FvKqNKnCRW7XYo9lXYEjhLfLLM7BjCksr5uve7FBs1rtqKCKq4trI&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQddr3E4zdyQmFfkzuig7B15j_992LPtbym_A&usqp=CAU',
    'https://grandemente.net/wp-content/uploads/Fotos-para-Perfil-10.jpg',
    'https://i.pinimg.com/474x/b2/d4/05/b2d40546cabcafeb05176ac5231a7b3c.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp_WGYqP_trI19NAGtHEkklsnH61LF4YpinQ&usqp=CAU',
    'https://cdn.dicionariopopular.com/imagens/fotoengracada-de-perfil-micao-jackson2.jpg?auto_optimize=low'

]

const midias = [
    'https://resultadosdigitais.com.br/files/2015/08/thestocks-imagem.jpg',
    null,
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz9hD7uu2AIxnHWQXn9DH4MtOb3N4gwiOv2g&usqp=CAU',
    'https://static.imgs.app/content/assetz/uploads/2017/05/imagens-legais-com-frases-engracadas-14681.jpg',
    'https://loremflickr.com/400/400',
    'https://loremflickr.com/400/400',
    'https://magazine.zarpo.com.br/wp-content/uploads/2019/04/ferias-de-julho-viagens-para-todos-os-gostos.jpg',
    'https://static.imgs.app/content/assetz/uploads/2017/04/piadas-muito-engracadas-17470.jpg',
    'https://64.media.tumblr.com/605689f904d099a54743847ace055508/1aa60e77696e8500-b3/s640x960/1f1c5b46150c0b4e33afc539da6cbb35f5d1b911.jpg'
]

const content = [
    'OLha que praia linda!',
    'As conversas sobre as #Eleições2022 estão a todo vapor! Foram 44 milhões de Tweets no 1º semestre sobre a corrida eleitoral brasileira 🇧🇷 ',
    'Como cargos estaduais também estão em disputa, teremos abas especiais para manter as pessoas informadas sobre sua região.',
    'ALGUÉM QUER CONVERSAR COMIGO?',
    'Ucrânia ataca ponte estratégica da cidade ocupada de Kherson\nA artilharia é "destinada a desmoralizar as tropas" do inimigo, afirmou porta-voz do comando sul das forças armadas ucranianas.',
    'Lorem ipsum dolor sit amet. Non atque error sit mollitia quibusdam qui animi reprehenderit a repellendus incidunt sed rerum dicta non quia iusto. Ea saepe expedita sed quia omnis 33 sint sint eum sequi autem. Sit sunt dolores eum ratione excepturi ea dicta sunt sed saepe accusamus rem odit pariatur.'
]

const titles = [
    'Uma ideia',
    'será se vale a PENA?',
    'Queria que todos os dias fossem assim!',
    'Lorem ipsum dolor sit amet. Ut velit explicabo earum assumenda non consequatur repellendus?',
    'e aut voluptas 33 autem expedita vel dolores Quis.',
    'Olhem q coisa legal!',
    '#Academia O de hoje ta pago!'
]

const commentsText = [
    'Se você sabe muito bem o que é ficar virando na cama enquanto sofre de insônia',
    'Eu não sei nada.',
    'Na próxima me chama pra viagem tambem!',
    'que lugar lindo amigaaaa',
    'Est neque explicabo nam asperiores iure rem cupiditate rerum. Aut magni voluptas sed reprehenderit tenetur a voluptatibus magni et quae debitis. Sed consequatur illum qui eaque fugiat sed voluptas soluta aut dolorum libero cum soluta perferendis ',
    'Prefiro nem me meter.',
    'Ea veritatis ipsum id consequatur perspiciatis sit natus sunt ut obcaecati nihil aut eligendi autem et nobis officiis ex magni officia. Eos aliquid illum eos quae voluptas eum autem'
]


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - 1 - min + 1) + min)
}


const createUserProfile = async (users) => {
    try {
        for (user_name of users) {
            var name_fist = user_name.split(' ')[0]
            var password = await bcrypt.hash(`${name_fist}123`, 10)
            var user = await new User({ user: `${name_fist}@gmail.com`, name: user_name, password: password }).save()
            var profile = await new Profile({
                name: user_name,
                user: user._id,
                about: about[randomNumber(0, about.length)],
                midia: profile_img[randomNumber(0, profile_img.length)]
            }).save()
            await User.findByIdAndUpdate(user._id, { profile: profile._id, })

            for (c in [1, 2, 3]) {
                var post = await new Post({
                    title: titles[randomNumber(0, titles.length)],
                    content: content[randomNumber(0, content.length)],
                    profile: profile._id,
                    midia: midias[randomNumber(0, midias.length)]
                }).save()
                await Profile.findByIdAndUpdate(profile._id, { $push: { posts: post._id } })
            }
            console.log(`Criou ${user.name}`)
        }
    } catch (err) {
        console.log(err)
    }
}


const followAndFollowing = async () => {
    try {
        const profiles = await Profile.find({})
        const profileIds = []
        for (profile of profiles) {
            profileIds.push(profile._id)
        }
        for (id_one of profileIds) {
            for (id_two of profileIds) {
                await Profile.findByIdAndUpdate(id_one, { $addToSet: { following: id_two } })
                await Profile.findByIdAndUpdate(id_two, { $addToSet: { followers: id_one } })
            }
        }
        console.log('Finish follow')

    } catch (err) {
        console.log(err)
    }
}


const commentAndLike = async () => {
    try {
        const profiles = await Profile.find({})
        const profileIds = []
        for (profile of profiles) {
            profileIds.push(profile._id)
        }

        const posts = await Post.find({})
        const postIds = []
        for (post of posts) {
            postIds.push(post._id)
        }


        for (c = 0; c < randomNumber(postIds.length, postIds.length * 4); c++) {
            var post_random = postIds[randomNumber(0, postIds.length)]
            var profile_random = profileIds[randomNumber(0, profileIds.length)]
            var comment = await new Comment({
                description: commentsText[randomNumber(0, commentsText.length)],
                post: post_random,
                profile: profile_random
            }).save()
            await Post.findByIdAndUpdate(post_random, { $addToSet: { comments: comment._id } })
        }

        for (c = 0; c < randomNumber(postIds.length, postIds.length * 15); c++) {
            var post_random = postIds[randomNumber(0, postIds.length)]
            var profile_random = profileIds[randomNumber(0, profileIds.length)]
            await Post.findByIdAndUpdate(post_random, { $addToSet: { likes: profile_random._id } })
        }

        console.log('Finish comments')

    } catch (err) {
        console.log(err)

    }
}

exports.createUserProfile =  createUserProfile
exports.followAndFollowing =  followAndFollowing
exports.commentAndLike =  commentAndLike

// createUserProfile(user_names)
//     .then(() => followAndFollowing()
//         .then(() => commentAndLike())
//     )





