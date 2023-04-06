<template>
	<div class="page">
		<view class="box-card info-panel" :body-style="{ padding: '0px' }" v-if="showList.disk.god.value === 3">
			<view style="color: red; font-size: 60px; display: flex; justify-content: center; align-items: center">推土机</view>
		</view>
		<view class="box-card info-panel" :class="showList.disk.win.value ? 'win' : null" :body-style="{ padding: '0px' }" v-if="showList.disk.god.value !== 3">
			<!--主信息-->
			<view class="panel">
				<view class="main-item" v-for="(v, i) in showList.info.main" :key="i">
					<span :style="{ color: v.color, fontSize: '30px' }">{{ v.value }}{{ v.unit }}</span>
					<!-- <CountTo :suffix="v.unit" :endVal="v.value" :duration="ctConfig.duration" :useEasing="ctConfig.useEasing" class="count-to" :style="{ color: v.color }" /> -->
					<view class="main-label" style="color: deeppink">{{ v.label }}</view>
				</view>
			</view>
			<!--积分计算-->
			<view class="panel evenly" v-if="showList.disk.win.value">
				<view v-for="(v, i) in showList.info.integral" :key="i">
					<span style="color: deepskyblue">{{ v.label }}:</span>
					<span :style="{ color: v.color }">{{ v.value }}{{ v.unit }}</span>
					<!-- <CountTo :endVal="v.value" :suffix="v.unit" :duration="ctConfig.duration" :useEasing="ctConfig.useEasing" class="count-to" :style="{ color: v.color }" /> -->
				</view>
			</view>
		</view>
		<!--详情抽屉-->
		<uni-popup ref="popup" class="popup" background-color="#fff">
			<!--详情-->
			<scroll-view style="height: 100%" scroll-y="true">
				<view class="detail" v-if="!!showList.price">
					<span>详情：</span>
					<span v-for="(v, i) in showList.info.detail" :key="i">
						<span :style="{ color: v.color }">[{{ v.label }}]</span>
						<span style="color: red" v-if="v.value">({{ v.value }})</span>
						,
					</span>
				</view>
				<view class="panel">
					<view class="panel-box">
						<view class="panel-title">胡数清单</view>
						<div v-for="(str, i) in showList.priceStrs" :key="i" style="text-align: center">
							<span>{{ str.label }}</span>
							<span style="color: red">({{ str.value }})</span>
						</div>
					</view>
					<view class="panel-box">
						<view class="panel-title">台数清单</view>
						<div v-for="(str, i) in showList.platformStrs" :key="i" style="text-align: center">
							<span>{{ str.label }}</span>
							<span style="color: red">({{ str.value }})</span>
						</div>
					</view>
				</view>
			</scroll-view>
		</uni-popup>
		<view class="content" :class="showList.disk.win.value ? 'win' : null">
			<view class="box-card" :body-style="{ padding: '0px' }">
				<view class="button-box">
					<button class="button" type="primary" size="mini" @click="initData()">全部重置</button>
					<button class="button" type="primary" size="mini" @click="showDetail()" v-if="showList.price">查看详情</button>
				</view>
				<view class="error-msg" v-if="showList.info.error.length">
					<span>异常提示：</span>
					<div v-for="(v, i) in showList.info.error" :key="i">{{ v.msg }}</div>
				</view>
				<view v-for="(item, index) in array" :key="index">
					<view class="line"></view>
					<view class="header">
						<view class="title">
							{{ item.name }}
							<span class="label" v-if="item.label">-{{ item.label }}</span>
							<span class="msg">{{ item.msg }}</span>
						</view>
						<button class="button" type="warn" size="mini" @click="initData(item.id)">重置</button>
					</view>
					<!-- 选项渲染 -->
					<div class="op_list">
						<view class="item" :class="['out', 'in'].includes(item.id) ? 'item-num' : 'item-disk'" v-for="(v, i) in item.list" :key="item.id + i">
							<span v-if="!v.hidden && v.type === 'switch'">
								<span class="switch_name">{{ v.name }}</span>
								<switch class="switch" color="#FFCC33" :checked="v.value" @change="v.value = $event.detail.value" />
							</span>

							<view class="select-box">
								<view class="select-title" v-if="!v.hidden && v.type === 'select'">{{ v.name }}</view>
								<uni-data-select style="width: 66px" v-model="v.value" :clear="false" :localdata="v.data" v-if="v.type === 'select'" size="small"></uni-data-select>
								<view class="select-tip" v-if="v.tip">{{ v.tip }}</view>
							</view>
						</view>
					</div>
				</view>
			</view>
		</view>
	</div>
</template>

<script setup>
	import { reactive, computed, getCurrentInstance } from 'vue'
	import data from './data'
	const { proxy } = getCurrentInstance()
	const ctConfig = {
		duration: 1000,
		useEasing: true
	}
	const showDetail = () => {
		proxy.$refs.popup.open('bottom')
	}
	const array = reactive(data)

	array.forEach(item => {
		item.list.forEach(v => {
			if (v.type === 'select') {
				v.data = []
				for (let n = 0; n < v.len; n++) {
					if (!Array.isArray(v.lenExclude) || !v.lenExclude.includes(n)) {
						v.data.push({ text: n + v.unit, value: n })
					}
				}
			}
		})
	})
	// console.log('>>>', array)
	const showList = computed(() => {
		let disk = {}
		let hiddenList = []
		let compareObj = { in: {}, out: {}, group: [] }
		let info = {
			main: [],
			detail: [],
			integral: [],
			error: []
		}
		let priceStrs = []
		let platformStrs = []
		let price = 0
		let platform = 0
		array.forEach(item => {
			item.list.forEach(v => {
				// 对象形式保存所有数据
				disk[v.id] = v
				// 保存隐藏的选项
				if (typeof v.hidden === 'boolean') hiddenList.push(v.id)
				// 保存对比值
				if (['out', 'in'].includes(item.id) && v.itemType) {
					if (v.itemType.includes('group')) {
						compareObj.group.push(v.id)
						if (v.itemType[1] !== undefined) {
							compareObj[item.id][v.itemType[1]] = v.id
						}
					}
				}
				// 有胡数的计算
				if (v.price && v.value) {
					if (v.type === 'switch') {
						priceStrs.push({ label: `${v.msg || v.name}`, value: `${v.price}胡` })
						price += v.price
						return
					}
					if (v.type === 'select') {
						let label = `${v.msg || v.name}-${v.value}${v.unit}`
						if (['out', 'in'].includes(item.id)) label = `${item.label}-${label}`
						// 中，发，自家风计算
						if (v.isPlatform) {
							if (v.value === 2) {
								priceStrs.push({ label, value: '2胡' })
								price += 2
								return
							}
							if (v.value >= 3) {
								platformStrs.push({ label, value: '1台' })
								platform += 1
								if (v.value >= 4) {
									priceStrs.push({ label, value: `${v.price * 4}胡` })
									price += v.price * 4
									return
								}
								priceStrs.push({ label, value: `${v.price}胡` })
								price += v.price
								return
							}
						}
						priceStrs.push({ label, value: `${v.price * v.value}胡` })
						price += v.price * v.value
						return
					}
				}
				// 台数计算
				if (item.id === 'platform' && v.value) {
					if (v.type === 'switch') {
						platformStrs.push({ label: `${v.msg || v.name}`, value: `${v.platform || 1}台` })
						platform += v.platform || 1
						return
					}
					// 财神计算
					if (v.id === 'god' && v.value === 2) {
						platformStrs.push({ label: `${v.msg || v.name}-${v.value}${v.unit}`, value: '1台' })
						platform += 1
						return
					}
				}
			})
		})
		// 花与无财神逻辑处理
		if (!disk.myFlower.value && disk.win.value && disk.god.value === 0) {
			platformStrs.push({ label: `${disk.god.msg || disk.god.name}-${disk.god.value}${disk.god.unit}`, value: '1台' })
			platform += 1
		}
		// 4个花逻辑处理
		if (disk.myFlower.value && disk.otherFlower.value >= 3) {
			platformStrs.push({ label: '4个花', value: '1台' })
			platform += 1
		}
		// 最多算3台
		platform = platform > 3 ? 3 : platform
		info.detail.push({ label: '台数', value: platform })
		// 主信息保存-台数
		info.main.push({ label: '总台数', value: platform, unit: '台', color: 'red' })
		info.detail.push({ label: '胡数', value: price })
		// 总胡数
		for (let i = platform; i > 0; i--) {
			price = price * 2
		}
		info.detail.push({ label: '胡数 * 2^台数', value: price })
		// 胡数算完不满10胡，按10胡算
		price = Math.ceil(price / 10) * 10
		info.detail.push({ label: '补10', value: price })

		// 最终胡数
		price = price > 300 ? 300 : price
		info.detail.push({ label: '最终胡数', value: price, color: 'green' })
		// 主信息保存-胡数
		info.main.push({ label: '总胡数', value: price, unit: '胡', color: 'darkcyan' })
		// 基础积分
		let basics = price / 10
		info.detail.push({ label: '基础积分=胡/10', value: basics })
		if (disk.win.value) {
			info.detail.push({ label: '你赢了', color: 'green' })
			let p = platform + 1
			let tIntegral = p * 3
			if (disk.break.value) {
				info.detail.push({ label: '断过了', color: 'green' })
				tIntegral = p * 5
			}
			info.detail.push({ label: `${platform}台积分加`, color: 'green', value: tIntegral })
			if (disk.dealer.value) {
				info.detail.push({ label: '你是头家', color: 'green' })
				info.detail.push({ label: '收所有宾家', color: 'blueviolet', value: basics * 2 + tIntegral })
				info.integral.push({ label: '所有宾家给', value: basics * 2 + tIntegral, color: 'blueviolet', unit: '分' })
			} else {
				info.detail.push({ label: '你是宾家', color: 'green' })
				info.detail.push({ label: '收头家', color: 'blueviolet', value: basics * 2 + tIntegral })
				info.integral.push({ label: '头家给', value: basics * 2 + tIntegral, color: 'blueviolet', unit: '分' })
				info.detail.push({ label: '收宾家', color: 'blueviolet', value: basics + tIntegral })
				info.integral.push({ label: '宾家给', value: basics + tIntegral, color: 'blueviolet', unit: '分' })
			}
		}
		// 主信息保存-基础积分
		info.main.push({ label: '基础积分', value: basics, unit: '分', color: 'blueviolet' })
		// 判断隐藏项是否显示
		hiddenList.forEach(id => (disk[id].hidden = !disk[disk[id].showKey].value))
		// 异常判断
		// 判断红中、发财、自家风里面外面是否都选了
		for (const itemType in compareObj.in) {
			const curIn = disk[compareObj.in[itemType]]
			if (curIn.value != 0 && disk[compareObj.out[itemType]].value != 0) info.error.push({ msg: `里面和外面的[${curIn.name}]不要同时选！` })
		}
		// 总和多于5组判断
		let groupConut = 0
		compareObj.group.forEach(key => {
			if (disk[key].itemType[1] === undefined) {
				groupConut = groupConut + disk[key].value
			} else if (disk[key].value >= 3) {
				groupConut = groupConut + 1
			}
		})
		if (groupConut > 5) info.error.push({ msg: `碰和杠总共不要多于5组！` })

		// console.log('disk:', disk, 'priceStrs:', priceStrs, 'platformStrs:', platformStrs, '信息', info);
		return { disk, info, priceStrs, platformStrs, price }
	})

	// 重置值
	const initData = key => {
		array.forEach(item => {
			item.list.forEach(v => {
				if ((key && key === item.id) || !key) {
					if (v.type === 'select') v.value = 0
					if (v.type === 'switch') v.value = false
				}
			})
		})
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
