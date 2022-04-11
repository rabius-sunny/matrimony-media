// import { Fragment, useState } from 'react'
// import { Listbox, Transition } from '@headlessui/react'
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

// const people = [
//     {
//         id: 1,
//         name: 'Item one'
//     },
//     {
//         id: 2,
//         name: 'Item two'
//     },
//     {
//         id: 3,
//         name: 'Item three'
//     },
//     {
//         id: 4,
//         name: 'Item four'
//     },
//     {
//         id: 5,
//         name: 'Item five'
//     },
//     {
//         id: 6,
//         name: 'Item five'
//     }
// ]

// function classNames(...classes) {
//     return classes.filter(Boolean).join(' ')
// }

// export default function Dropdown({ legend }) {
//     const [selected, setSelected] = useState(people[3])

//     return <div style={{ maxWidth: '200px' }}>
//         <Listbox value={selected} onChange={setSelected}>
//             {({ open }) => (
//                 <>
//                     <Listbox.Label className="block text-sm font-medium text-white">{legend}</Listbox.Label>
//                     <div className="mt-1 relative">
//                         <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
//                             <span className="ml-3 block truncate">{selected.name}</span>
//                             <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
//                                 <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//                             </span>
//                         </Listbox.Button>

//                         <Transition
//                             show={open}
//                             as={Fragment}
//                             leave="transition ease-in duration-100"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                         >
//                             <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
//                                 {people.map((person) => (
//                                     <Listbox.Option
//                                         key={person.id}
//                                         className={({ active }) =>
//                                             classNames(
//                                                 active ? 'text-white bg-indigo-600' : 'text-gray-900',
//                                                 'cursor-default select-none relative py-2 pl-3 pr-9'
//                                             )
//                                         }
//                                         value={person}
//                                     >
//                                         {({ selected, active }) => (
//                                             <>
//                                                 <div
//                                                     className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
//                                                 >
//                                                     {person.name}
//                                                 </div>

//                                                 {selected ? (
//                                                     <span
//                                                         className={classNames(
//                                                             active ? 'text-white' : 'text-indigo-600',
//                                                             'absolute inset-y-0 right-0 flex items-center pr-4'
//                                                         )}
//                                                     >
//                                                         <CheckIcon className="h-5 w-5" aria-hidden="true" />
//                                                     </span>
//                                                 ) : null}
//                                             </>
//                                         )}
//                                     </Listbox.Option>
//                                 ))}
//                             </Listbox.Options>
//                         </Transition>
//                     </div>
//                 </>
//             )}
//         </Listbox>
//     </div>
// }

import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const people = [
    { name: 'সকল' },
    { name: 'সকল' },
    { name: 'সকল' },
    { name: 'সকল' },
    { name: 'সকল' }
]

export default function Dropdown({ legend }) {
    const [selected, setSelected] = useState(people[0])

    return (
        <div className="my-2">
            <Listbox value={selected} onChange={setSelected}>
                <Listbox.Label className="block text-sm font-medium text-white">{legend}</Listbox.Label>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-red-800 focus:border-red-800 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <SelectorIcon
                                className="w-5 h-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-red-600 bg-red-100' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-600">
                                                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
