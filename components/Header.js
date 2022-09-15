import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useI18N } from 'context/i18n'

import { Navbar, Text, Input, Switch, useTheme } from "@nextui-org/react"
import { useTheme as useNextTheme } from 'next-themes'

import { SearchIcon } from "./SearchIcon.js"
import { SunIcon } from './SunIcon.js'
import { MoonIcon } from './MoonIcon.js'

export function Header() {
  const [results, setResults] = useState([])
  const searchRef = useRef()
  const { locale, locales } = useRouter()
  const { t } = useI18N()

  // Dark Mode
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();

  // Query for search comic
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
        <h2 className='mr-auto text-sm font-bold   xs:text-lg   sm:text-2xl'>xkcd App</h2>

        <div className='mx-0   xs:mx-4'>
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
              className='py-1.5 px-4 w-44   xs:px-2 xs:w-56'
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
                          <Text className='w-full text-sm overflow-hidden text-black text-ellipsis whitespace-nowrap'>
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
        
        <div className='mr-0 xs:mr-4'>
          <Switch
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            iconOn={<SunIcon filled />}
            iconOff={<MoonIcon filled />}
            shadow
          />
        </div>

        <Navbar.Content
          activeColor="primary"
          variant="defaul"
          className='text-sm hidden   xs:flex   sm:text-base'
        >
          <Link href='/'>
            <Navbar.Link className='ml-0' isActive>{t('HOME_HEADER')}</Navbar.Link>
          </Link>
          <Link href='/' locale={restOfLocales[0]}>
            <a className='font-normal'>{restOfLocales[0]}</a>
          </Link>
        </Navbar.Content>
      </Navbar>
    </>
  )
}
