"use client";

import { useState } from "react";

type Props = {
    initialCategory: string;
};

const categories = [
    { label: "Malerier", value: "malerier" },
    { label: "Grafikk", value: "grafikk" },
    { label: "Tegninger", value: "tegninger" },
    { label: "Fotografier", value: "fotografier" },
];

export default function CategoryFilter({ initialCategory }: Props) {
    const [selected, setSelected] = useState(initialCategory);

    return (
        <fieldset className="category-filter">
            <input type="hidden" name="category" value={selected} />

            <div className="category-buttons">
                {categories.map((category) => (
                  <button
                     key={category.value}
                     type="button"
                     aria-pressed={selected === category.value}
                     onClick={() =>
                        setSelected(
                            selected === category.value ? "" : category.value
                        )
                     }
                  >{category.label}</button>
                ))}
            </div>
        </fieldset>
    );
}