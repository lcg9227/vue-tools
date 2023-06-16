<template>
	<view class="uni-stat__select">
		<span v-if="label" class="uni-label-text hide-on-phone">{{ label + '：' }}</span>
		<view class="uni-stat-box" :class="{ 'uni-stat__actived': multiple ? current.length > 0 : current }">
			<view class="uni-select" :class="{ 'uni-select--disabled': disabled, 'uni-select--multiple': multiple }">
				<view class="uni-select__input-box" :class="{ 'uni-select__input-box--multiple': multiple }" @click="toggleSelector">
					<view v-if="current.length > 0" :class="multiple ? 'uni-select__input-text-multiple' : 'uni-select__input-text'">
						<view v-if="multiple">
							<uni-tag class="uni-select__tag" v-for="(item, index) in current" :key="index" :text="item.text" type="success" />
						</view>
						<view v-else>{{ current }}</view>
					</view>
					<view v-else class="uni-select__input-text uni-select__input-placeholder">{{ typePlaceholder }}</view>
					<uni-icons v-if="current && clear" type="clear" color="#c0c4cc" size="24" @click="clearVal" />
					<uni-icons v-else :type="showSelector ? 'top' : 'bottom'" size="14" color="#999" />
				</view>
				<view class="uni-select--mask" v-if="showSelector" @click="toggleSelector" />
				<view class="uni-select__selector" v-if="showSelector">
					<view class="uni-popper__arrow"></view>
					<uni-easyinput class="uni-input" type="number" confirm-type="search" :clearSize="18" v-model="search" v-if="hasSearch" placeholder="输入进行搜索" />
					<scroll-view scroll-y="true" class="uni-select__selector-scroll">
						<view class="uni-select__selector-empty" v-if="mixinDatacomResData.length === 0">
							<text>{{ emptyTips }}</text>
						</view>
						<view v-else>
							<view
								class="uni-select__selector-item"
								:class="{ 'uni-select__selector-item--selected': (multiple && item.selected) || (!multiple && formatItemName(item) === current) }"
								v-for="(item, index) in searchData"
								:key="index"
								@click="change(item)">
								<view>
									<RenderNode v-if="item.render && typeof item.render == 'function'" :render="item.render" :par="12"></RenderNode>
									<text :class="{ 'uni-select__selector__disabled': item.disable }" v-else>{{ formatItemName(item) }}</text>
								</view>
								<view>
									<uni-icons v-if="(multiple && item.selected) || (!multiple && formatItemName(item) === current)" type="checkmarkempty" size="14" color="#409eff" />
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * DataChecklist 数据选择器
	 * @description 通过数据渲染的下拉框组件
	 * @property {String} value 默认值
	 * @property {Array} localdata 本地数据 ，格式 [{text:'',value:''}]
	 * @property {Boolean} clear 是否可以清空已选项
	 * @property {Boolean} emptyText 没有数据时显示的文字 ，本地数据无效
	 * @property {String} label 左侧标题
	 * @property {String} placeholder 输入框的提示文字
	 * @property {Boolean} disabled 是否禁用
	 * @property {Boolean} multiple 是否为多选
	 * @property {Boolean} hasSearch 是否有搜索框
	 * @event {Function} change  选中发生变化触发
	 */
	import RenderNode from '../RenderNode/RenderNode'
	export default {
		name: 'lcg-select',
		mixins: [uniCloud.mixinDatacom || {}],
		components: { RenderNode },
		data() {
			return {
				showSelector: false,
				current: '',
				mixinDatacomResData: [],
				apps: [],
				channels: [],
				search: ''
			}
		},
		props: {
			localdata: {
				type: Array,
				default() {
					return []
				}
			},
			value: {
				type: [String, Number, Array],
				default: ''
			},
			modelValue: {
				type: [String, Number, Array],
				default: ''
			},
			label: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: '请选择'
			},
			emptyTips: {
				type: String,
				default: '无选项'
			},
			clear: {
				type: Boolean,
				default: false
			},
			defItem: {
				type: Number,
				default: 0
			},
			disabled: {
				type: Boolean,
				default: false
			},
			multiple: {
				type: Boolean,
				default: false
			},
			hasSearch: {
				type: Boolean,
				default: false
			}
		},
		created() {
			this.last = `${this.collection}_last_selected_option_value`
			if (this.collection && !this.localdata.length) {
				this.query()
			}
		},
		computed: {
			typePlaceholder() {
				const text = {
					'opendb-stat-app-versions': '版本',
					'opendb-app-channels': '渠道',
					'opendb-app-list': '应用'
				}
				const common = this.placeholder
				const placeholder = text[this.collection]
				return placeholder ? common + placeholder : common
			},
			searchData() {
				if (this.search) {
					return this.mixinDatacomResData.filter(v => v.text.includes(this.search))
				}
				return this.mixinDatacomResData
			}
		},
		watch: {
			localdata: {
				immediate: true,
				handler(val, old) {
					if (Array.isArray(val) && old !== val) {
						this.mixinDatacomResData = val
					}
				}
			},
			// #ifndef VUE3
			value() {
				this.initDefVal()
			},
			// #endif
			// #ifdef VUE3
			modelValue(val) {
				this.initDefVal()
			},
			// #endif
			mixinDatacomResData: {
				immediate: true,
				handler(val) {
					if (val.length) {
						this.initDefVal()
					}
				}
			}
		},
		methods: {
			// 执行数据库查询
			query() {
				this.mixinDatacomEasyGet()
			},
			// 监听查询条件变更事件
			onMixinDatacomPropsChange() {
				this.query()
			},
			// 初始化默认值
			initDefVal() {
				if (this.multiple && !Array.isArray(this.current)) {
					this.current = []
				}
				let defValue = this.multiple ? [] : ''
				if ((this.value || this.value === 0) && !this.isDisabled(this.value)) {
					defValue = this.value
				} else if ((this.modelValue || this.modelValue === 0) && !this.isDisabled(this.modelValue)) {
					defValue = this.modelValue
				} else {
					let strogeValue
					if (this.collection) {
						strogeValue = uni.getStorageSync(this.last)
					}
					if (strogeValue || strogeValue === 0) {
						defValue = strogeValue
					} else {
						let defItem = ''
						if (this.defItem > 0 && this.defItem <= this.mixinDatacomResData.length) {
							defItem = this.mixinDatacomResData[this.defItem - 1].value
							if (this.multiple) {
								defItem.selected = true
							}
						}
						defValue = this.multiple ? [] : defItem
					}
					if (defValue || defValue === 0) {
						this.emit(defValue)
					}
				}
				if (this.multiple) {
					this.mixinDatacomResData.forEach(item => {
						item.selected = defValue.includes(item.value) || defValue.includes(item.text)
						const curIndex = this.current.find(v => v.value == item.value)
						if (item.selected && curIndex === -1) {
							this.current.push(item)
						}
					})
				} else {
					const def = this.mixinDatacomResData.find(item => item.value === defValue)
					this.current = def ? this.formatItemName(def) : ''
				}
			},

			/**
			 * @param {[String, Number]} value
			 * 判断用户给的 value 是否同时为禁用状态
			 */
			isDisabled(value) {
				let isDisabled = false

				this.mixinDatacomResData.forEach(item => {
					if (item.value === value) {
						isDisabled = item.disable
					}
				})

				return isDisabled
			},

			clearVal() {
				this.current = this.multiple ? [] : ''
				this.emit(this.current)
				if (this.collection) {
					uni.removeStorageSync(this.last)
				}
			},
			// 值判断
			change(item) {
				if (!item.disable) {
					// 多选
					if (this.multiple) {
						const cur = this.mixinDatacomResData.find(v => v.value === item.value)
						if (cur) {
							if (!cur.selected) {
								cur.selected = true
								this.current.push(cur)
								this.emit(this.current)
							} else {
								const index = this.current.findIndex(v => v.value === item.value)
								cur.selected = false
								this.current.splice(index, 1)
								this.emit(this.current)
							}
						}
						return
					}
					this.showSelector = false
					this.current = this.formatItemName(item)
					this.emit(item.value)
				}
			},
			emit(val) {
				if (this.multiple) {
					const valArr = val.map(v => v.value)
					this.$emit('change', valArr, val)
					this.$emit('update:modelValue', valArr)
					return
				}
				this.$emit('change', val)
				this.$emit('input', val)
				this.$emit('update:modelValue', val)
				if (this.collection) {
					uni.setStorageSync(this.last, val)
				}
			},

			toggleSelector() {
				if (this.disabled) {
					return
				}

				this.showSelector = !this.showSelector
			},
			formatItemName(item) {
				let { text, value, channel_code } = item
				channel_code = channel_code ? `(${channel_code})` : ''
				return this.collection.indexOf('app-list') > 0 ? `${text}(${value})` : text ? text : `未命名${channel_code}`
			}
		}
	}
</script>

<style lang="scss">
	$uni-base-color: #6a6a6a !default;
	$uni-main-color: #333 !default;
	$uni-secondary-color: #909399 !default;
	$uni-border-3: #e5e5e5;

	/* #ifndef APP-NVUE */
	@media screen and (max-width: 500px) {
		.hide-on-phone {
			display: none;
		}
	}

	/* #endif */
	.uni-stat__select {
		display: flex;
		align-items: center;
		// padding: 15px;
		cursor: pointer;
		width: 100%;
		flex: 1;
		box-sizing: border-box;
	}

	.uni-stat-box {
		width: 100%;
		flex: 1;
	}

	.uni-stat__actived {
		width: 100%;
		flex: 1;
		// outline: 1px solid #2979ff;
	}

	.uni-label-text {
		font-size: 14px;
		font-weight: bold;
		color: $uni-base-color;
		margin: auto 0;
		margin-right: 5px;
	}
	.uni-input {
		font-size: 14px;
		// border: 1px solid $uni-border-3;
		box-sizing: border-box;
		// border-radius: 4px;
		// padding: 0 5px;
		// height: 35px;
		width: auto;
		flex: 1;
		margin: 3px 5px 5px 5px;
	}
	.uni-select {
		font-size: 14px;
		border: 1px solid $uni-border-3;
		box-sizing: border-box;
		border-radius: 4px;
		padding: 0 5px;
		padding-left: 10px;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		user-select: none;
		/* #endif */
		flex-direction: row;
		align-items: center;
		border-bottom: solid 1px $uni-border-3;
		width: 100%;
		flex: 1;
		height: 35px;

		&--disabled {
			background-color: #f5f7fa;
			cursor: not-allowed;
		}
		&--multiple {
			height: auto;
			min-height: 35px;
			padding: 5px;
			box-sizing: border-box;
		}
	}
	.uni-select__tag {
		display: inline-flex;
		margin: 2px;
		padding: 2px 4px;
	}
	.uni-select__label {
		font-size: 16px;
		// line-height: 22px;
		height: 35px;
		padding-right: 10px;
		color: $uni-secondary-color;
	}

	.uni-select__input-box {
		height: 35px;
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		flex-direction: row;
		align-items: center;
		&--multiple {
			height: auto;
			min-height: 25px;
		}
	}
	.uni-select__input {
		flex: 1;
		font-size: 14px;
		height: 22px;
		line-height: 22px;
	}

	.uni-select__input-plac {
		font-size: 14px;
		color: $uni-secondary-color;
	}

	.uni-select__selector {
		/* #ifndef APP-NVUE */
		box-sizing: border-box;
		/* #endif */
		position: absolute;
		top: calc(100% + 12px);
		left: 0;
		width: 100%;
		background-color: #ffffff;
		border: 1px solid #ebeef5;
		border-radius: 6px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		z-index: 3;
		padding: 4px 0;
	}

	.uni-select__selector-scroll {
		/* #ifndef APP-NVUE */
		max-height: 200px;
		box-sizing: border-box;
		/* #endif */
	}

	.uni-select__selector-empty,
	.uni-select__selector-item {
		display: flex;
		cursor: pointer;
		justify-content: space-between;
		line-height: 35px;
		font-size: 14px;
		text-align: center;
		/* border-bottom: solid 1px $uni-border-3; */
		padding: 0px 10px;
		&--selected {
			color: #409eff;
		}
	}

	.uni-select__selector-item:hover {
		background-color: #f9f9f9;
	}

	.uni-select__selector-empty:last-child,
	.uni-select__selector-item:last-child {
		/* #ifndef APP-NVUE */
		border-bottom: none;
		/* #endif */
	}

	.uni-select__selector__disabled {
		opacity: 0.4;
		cursor: default;
	}

	/* picker 弹出层通用的指示小三角 */
	.uni-popper__arrow,
	.uni-popper__arrow::after {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
		border-color: transparent;
		border-style: solid;
		border-width: 6px;
	}

	.uni-popper__arrow {
		filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
		top: -6px;
		left: 10%;
		margin-right: 3px;
		border-top-width: 0;
		border-bottom-color: #ebeef5;
	}

	.uni-popper__arrow::after {
		content: ' ';
		top: 1px;
		margin-left: -6px;
		border-top-width: 0;
		border-bottom-color: #fff;
	}

	.uni-select__input-text {
		// width: 280px;
		width: 100%;
		color: $uni-main-color;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
		overflow: hidden;
	}
	.uni-select__input-text-multiple {
		width: 100%;
		color: $uni-main-color;
	}
	.uni-select__input-placeholder {
		color: $uni-base-color;
		font-size: 12px;
	}

	.uni-select--mask {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
	}
</style>
