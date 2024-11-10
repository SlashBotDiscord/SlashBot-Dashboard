import { useEffect, useState } from "react";
import styles from "./RoleSelect.module.css"
import { APIRole } from "discord-api-types/v10";
import { CustomAPIRole } from "@/lib/apiCalls/getRoles";
import { CheckedIcon, RightArrowIcon } from "@/components/Icons/Icons";

export default function RoleSelector({roles, onChange, maxCount}: {roles: CustomAPIRole[], onChange: (role: CustomAPIRole[]) => void, maxCount: number}) {
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState<CustomAPIRole[]>([]);
    const [availableRoles, setAvailableRoles] = useState<CustomAPIRole[]>([]);

    useEffect(() => {
        setAvailableRoles(roles.sort((a, b) => b.rawPosition - a.rawPosition))
    }, [roles])

    function roleClicked(role: CustomAPIRole) {
        if(maxCount === 1) {
            if(selected[0] === role) {
                setSelected([])
                onChange([])
                return true;
            }
            setSelected([role])
            onChange([role])
            return true;
        }
        if(
            selected?.length >= maxCount &&
            !selected.includes(role)
        ) return false;
        const newSelected = selected.includes(role)
            ? selected.filter(r => r.id !== role.id)
            : [...selected, role]
        setSelected(newSelected)
        onChange(selected || [])
        return true;
    }

    return (
        <div className={`${styles.wrapper} ${expanded ? styles.expanded : ""}`}>
            <div className={`${styles.selectedBox}`} onClick={() => setExpanded(!expanded)}>
                <RightArrowIcon className={styles.icon}/>
                <div className={styles.selectedList}>
                {
                    selected?.length
                        ? selected.map(role => <RoleContainer key={role.id} name={role.name} color={role.color} />)
                        : <span>Select {maxCount > 1 ? `up to ${maxCount} roles` : "a role"}</span>
                }
                </div>
            </div>
            {
                expanded
                    ? <div className={styles.dropdown}>
                        {
                            availableRoles.map(role => 
                                <div key={role.id} className={styles.roleContainer} onClick={() => {
                                    const success = roleClicked(role)
                                    if(!success) alert(`You can only select up to ${maxCount} roles`)
                                }}>
                                    <CheckedIcon className={selected.includes(role) ? styles.checked : styles.unchecked} />
                                    <RoleContainer
                                        name={role.name}
                                        color={role.color}
                                        selected={false}
                                    />
                                </div>
                            )
                        }
                    </div>
                    : null
            }
        </div>
    )
}

function RoleContainer({name, color, selected}: {name: string, color: number, selected?: boolean}) {
    color = color || 12305148;
    return (
        <span className={styles.role} style={{color: `#${color.toString(16).padStart(6, "0")}`, backgroundColor: `#${color.toString(16).padStart(6, "0")}1a`}}>
            {name[0] !== "@" ? "@" : ""}{name}
        </span>
    )
}