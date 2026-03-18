import iconInstagram from '../../assets/ic-instagram.svg'
import iconWhatsapp from '../../assets/ic-whatsapp.svg'
import IconLink from '../../ui/IconLink/IconLink'
import Title from '../../ui/Title/Title'

const Footer = () => {
	return (
		<footer className='mb-10 md:mb-20'>
			<Title className='mb-[var(--m-bottom-title-xs)] md:mb-[var(--m-bottom-title-md)]'>
				Контактные данные
			</Title>
			<div className='grid md:gap-8 gap-4 grid-cols-1 md:grid-cols-[60%_1fr] w-full'>
				<div className='bg-secondary-grey p-8 flex rounded-xl flex-col gap-4'>
					<span className='text-main-grey md:text-xl'>Телефон</span>
					<a
						href='tel:+79612327206'
						className='lg:text-[40px] text-xl font-semibold'
					>
						+7 (961) 232 72 06
					</a>
				</div>
				<div className='bg-secondary-grey p-8 flex rounded-xl flex-col gap-4'>
					<span className='text-main-grey md:text-xl'>Социальные сети</span>
					<div className='flex gap-4'>
						<IconLink
							to='https://www.instagram.com/'
							icon={iconInstagram}
							size={44}
							alt={'Instagram'}
							external={true}
							className='hover:opacity-80 hover:scale-110 active:opacity-80 active:scale-110 w-8 md:w-11'
						/>
						<IconLink
							to='https://www.whatsapp.com/'
							icon={iconWhatsapp}
							size={44}
							alt={'Whatsapp'}
							external={true}
							className='hover:opacity-80 hover:scale-110 active:opacity-80 active:scale-110 w-8 md:w-11'
						/>
					</div>
				</div>
				<div className='bg-secondary-grey p-8 flex rounded-xl flex-col gap-4'>
					<span className='text-main-grey md:text-xl'>Адрес</span>
					<a
						href='https://www.google.com/maps/place/%D0%9D%D0%BE%D0%B2%D0%BE%D1%81%D0%B8%D0%B1%D0%B8%D1%80%D1%81%D0%BA%D0%B8%D0%B9+%D1%85%D0%B8%D0%BC%D0%B8%D0%BA%D0%BE-%D1%82%D0%B5%D1%85%D0%BD%D0%BE%D0%BB%D0%BE%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D0%B9+%D0%BA%D0%BE%D0%BB%D0%BB%D0%B5%D0%B4%D0%B6+%D0%B8%D0%BC.+%D0%94.%D0%98.+%D0%9C%D0%B5%D0%BD%D0%B4%D0%B5%D0%BB%D0%B5%D0%B5%D0%B2%D0%B0/@55.016304,82.9383382,17z/data=!3m1!4b1!4m6!3m5!1s0x42dfe674a5148131:0x8999f557d048fc74!8m2!3d55.016304!4d82.9409131!16s%2Fg%2F11g9nh6s7y?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D'
						className='lg:text-[40px] text-xl font-semibold'
						target='_blank'
					>
						ул. Садовая, 26, Новосибирск, Новосибирская обл., 630102
					</a>
				</div>
				<div className='bg-secondary-grey p-8 flex rounded-xl flex-col gap-4'>
					<span className='text-main-grey md:text-xl'>Рабочие часы</span>
					<span className='lg:text-[40px] text-xl font-semibold'>
						24 часа в сутки
					</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer
