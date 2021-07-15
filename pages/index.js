import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(propriedades) {
  console.log(propriedades)
  return (
    <Box>
      {/* pegar foto de perfil através do github */}
      <img
        /* template strings */
        src={`https://github.com/${propriedades.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'yurimarim'
  const favPeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favPeople.length})
            </h2>
            <ul>
              {/* passa em todos os valores do array */}
              {favPeople.map(currentItem => {
                return (
                  <li>
                    <a href={`/users/${currentItem}`} key={currentItem}>
                      <img src={`https://github.com/${currentItem}.png`} />
                      <span>{currentItem}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <Box>Comunidades</Box>
        </div>
      </MainGrid>
    </>
  )
}
