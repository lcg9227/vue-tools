export default [
	{
		id: 'disk',
		name: '盘面',
		list: [
			{
				id: 'break',
				name: '断',
				type: 'switch',
				value: false,
			},
			{
				id: 'dealer',
				name: '头家',
				type: 'switch',
				value: false,
			},
			{
				id: 'win',
				name: '胡',
				type: 'switch',
				value: false,
				price: 20,
				msg: '基胡',
			},
			{
				id: 'self',
				name: '自摸',
				type: 'switch',
				value: false,
				price: 2,
				showKey: 'win', // win为true时显示
				hidden: true, // 是否隐藏
			},
			{
				id: 'center',
				name: '卡裆',
				type: 'switch',
				value: false,
				price: 2,
				showKey: 'win',
				hidden: true,
			},
		],
	},
	{
		id: 'platform',
		name: '台数',
		list: [
			{
				id: 'god',
				name: '财神',
				type: 'select',
				value: 0,
				len: 4,
				unit: '个',
			},
			{
				id: 'myFlower',
				name: '自家花',
				type: 'switch',
				value: false,
			},
			{
				id: 'ddh',
				name: '对对胡',
				type: 'switch',
				value: false,
				showKey: 'win',
				hidden: true,
			},
			{
				id: 'hys',
				name: '混一色',
				type: 'switch',
				value: false,
				showKey: 'win',
				hidden: true,
			},
			{
				id: 'th',
				name: '天湖',
				type: 'switch',
				value: false,
				showKey: 'win',
				hidden: true,
				platform: 3,
			},
			{
				id: 'dh',
				name: '地湖',
				type: 'switch',
				value: false,
				showKey: 'win',
				hidden: true,
				platform: 3,
			},
			{
				id: 'qys',
				name: '清一色',
				type: 'switch',
				value: false,
				showKey: 'win',
				hidden: true,
				platform: 3,
			},
			{
				id: 'sx',
				name: '大小四喜',
				type: 'switch',
				value: false,
				showKey: 'win',
				hidden: true,
				platform: 3,
			},
			{
				id: 'dtddp',
				name: '大头对对碰',
				type: 'switch',
				value: false,
				showKey: 'win',
				hidden: true,
				platform: 3,
			},
		],
	},
	{
		id: 'out',
		name: '胡数',
		label: '外',
		msg: '放炮胡算外面',
		list: [
			// 外
			{
				id: 'outSmallBumper',
				itemType: ['group'],
				name: '小碰',
				tip: '外2-8',
				type: 'select',
				value: 0,
				len: 6,
				unit: '组',
				price: 2,
			},
			{
				id: 'outBigBumper',
				itemType: ['group'],
				name: '大碰',
				type: 'select',
				tip: '外大子',
				value: 0,
				len: 6,
				unit: '组',
				price: 4,
			},
			{
				id: 'outSmallBar',
				itemType: ['group'],
				name: '小杠',
				type: 'select',
				tip: '2-8明杠',
				value: 0,
				len: 6,
				unit: '组',
				price: 8,
			},
			{
				id: 'outBigBar',
				itemType: ['group'],
				name: '大杠',
				tip: '大子明杠',
				type: 'select',
				value: 0,
				len: 6,
				unit: '组',
				price: 16,
			},
			{
				id: 'outMyWind',
				isPlatform: true,
				itemType: ['group', 'wind'],
				name: '自家风',
				type: 'select',
				value: 0,
				len: 5,
				lenExclude: [1, 2],
				unit: '个',
				price: 4,
			},
			{
				id: 'outRed',
				itemType: ['group', 'red'],
				name: '红中',
				isPlatform: true,
				type: 'select',
				value: 0,
				len: 5,
				lenExclude: [1, 2],
				unit: '个',
				price: 4,
			},
			{
				id: 'outFortune',
				itemType: ['group', 'fortune'],
				name: '发财',
				isPlatform: true,
				type: 'select',
				value: 0,
				len: 5,
				lenExclude: [1, 2],
				unit: '个',
				price: 4,
			},
			{
				id: 'otherFlower',
				name: '别人花',
				type: 'select',
				value: 0,
				len: 4,
				unit: '个',
				price: 4,
			},
		],
	},
	{
		id: 'in',
		name: '胡数',
		label: '内',
		msg: '自摸胡算里面',
		list: [
			// 内
			{
				id: 'inSmallBumper',
				itemType: ['group'],
				name: '小碰',
				tip: '内2-8',
				type: 'select',
				value: 0,
				len: 6,
				unit: '组',
				price: 4,
			},
			{
				id: 'inBigBumper',
				itemType: ['group'],
				name: '大碰',
				tip: '内大子',
				type: 'select',
				value: 0,
				len: 6,
				unit: '组',
				price: 8,
			},
			{
				id: 'inSmallBar',
				itemType: ['group'],
				name: '小暗杠',
				type: 'select',
				tip: '2-8暗杠',
				value: 0,
				len: 6,
				unit: '组',
				price: 16,
			},
			{
				id: 'inBigBar',
				itemType: ['group'],
				name: '大暗杠',
				type: 'select',
				tip: '大子暗杠',
				value: 0,
				len: 6,
				unit: '组',
				price: 32,
			},
			{
				id: 'inMyWind',
				itemType: ['group', 'wind'],
				name: '自家风',
				isPlatform: true,
				type: 'select',
				value: 0,
				len: 5,
				lenExclude: [1],
				unit: '个',
				price: 8,
			},
			{
				id: 'inRed',
				itemType: ['group', 'red'],
				name: '红中',
				isPlatform: true,
				type: 'select',
				value: 0,
				len: 5,
				lenExclude: [1],
				unit: '个',
				price: 8,
			},
			{
				id: 'inFortune',
				itemType: ['group', 'fortune'],
				name: '发财',
				isPlatform: true,
				type: 'select',
				value: 0,
				len: 5,
				lenExclude: [1],
				unit: '个',
				price: 8,
			},
		],
	},
];
