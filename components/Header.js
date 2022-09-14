import { useRef, useState } from 'react'
import Link from 'next/link'
import { useI18N } from 'context/i18n'
import { useRouter } from 'next/router'

import { Navbar, Text, Input } from "@nextui-org/react"
import { SearchIcon } from "./SearchIcon.js"

export function Header() {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const { locale, locales } = useRouter()
  const { t } = useI18N()

  const getValue = () => searchRef.current?.value

  const handleChange = (e) => {
    const q = getValue()
    if(!q) return

    fetch(`/api/search?q=${q}`)
      .then(res => res.json())
      .then(serachResults => {
        setResults(serachResults)
      })
  }

  const restOfLocales = locales.filter(l => l !== locale)

  return (
    <>
      <Navbar variant="sticky">
        <h2 className='mr-0 text-sm font-bold   xs:text-lg xs:mr-auto   sm:text-2xl'>xkcd App</h2>

        <div className='mr-0   sm:mr-4'>
          <Input
              ref={searchRef}
              onChange={handleChange}
              clearable
              contentLeft={<SearchIcon fill="var(--nextui-colors-accents6)" size={16} />}
              contentLeftStyling={false}
              css={{ w: "100%", "@xsMax": { mw: "300px" },
                "& .nextui-input-content--left": { h: "100%", ml: "$4", dflex: "center"}}}
              placeholder="Search..."
              aria-label="Search"
              bordered
              rounded
              className='py-2 px-4 w-44   xs:py-1 xs:px-2 xs:w-56'
            />
          {
            Boolean(results.length) &&
              <ul className='mt-2 p-4 w-52 bg-white absolute rounded-lg shadow-2xl'>
                <li key="all-search">
                  <Link href={`/search?q=${getValue()}`}>
                    <a>
                      <Text color="primary" b>
                        {t('SEARCH_RESULT_HEADER', results.length)}
                      </Text>
                    </a>
                  </Link>
                </li>
                {
                  results.map(result => (
                    <li key={result.id}>
                      <Link href={`/comic/${result.id}`}>
                        <a>
                          <Text className='w-full text-sm overflow-hidden text-ellipsis whitespace-nowrap'>
                            {result.title}
                          </Text>
                        </a>
                      </Link>
                    </li>
                  ))
                }
              </ul>
          }
        </div>

        <Navbar.Content
          enableCursorHighlight
          activeColor="primary"
          variant="highlight-rounded"
          className='text-sm   sm:text-base'
        >
          <Link href='/' className='hidden   xs:flex'>
            <Navbar.Link className='hidden   xs:flex' isActive>{t('HOME_HEADER')}</Navbar.Link>
          </Link>
          <Link href='/' locale={restOfLocales[0]}>
            <Navbar.Link>{restOfLocales[0]}</Navbar.Link>
          </Link>
        </Navbar.Content>
      </Navbar>
    </>
  )
}
