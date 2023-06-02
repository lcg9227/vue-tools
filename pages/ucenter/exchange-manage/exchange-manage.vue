<template>
	<view class="warp">
		<lcg-nav-bar title="兑换管理"></lcg-nav-bar>
		<!-- 积分配置 -->
		<uni-card>
			<template v-slot:title>
				<uni-list>
					<uni-list-item title="积分配置">
						<template v-slot:footer>
							<div class="b-link" @click="onLvAdd">添加</div>
						</template>
					</uni-list-item>
				</uni-list>
			</template>
			<uni-list>
				<template v-for="(item, index) in config.score_level" :key="index">
					<uni-list-item :title="`${item.text} - ${item.limit}`">
						<template v-slot:footer>
							<div class="b-link" @click="onLvEdit(item, index)">修改</div>
							<div class="b-link delete" @click="onLvDel(item, index)">删除</div>
						</template>
					</uni-list-item>
				</template>
			</uni-list>
		</uni-card>
		<lcg-easy-form ref="lv_easyForm"></lcg-easy-form>
	</view>
</template>

<script>
	const lv_form = {
		fields: { limit: '' },
		items: [{ field: 'limit', label: '积分', type: 'input', placeholder: '请输入达到当前等级的积分', required: true }]
	}
	export default {
		components: {},
		data() {
			return {
				current: 0,
				userInfo: {},
				children: [],
				config: {
					score_level: []
				}
			}
		},
		created() {
			this.userInfo = this.api.getUserInfo()
			if (this.userInfo.hasLogin) {
				this.getConfig()
			}
		},
		methods: {
			getConfig() {
				this.api.get_config().then(config => (this.config = config))
			},
			onLvAdd() {
				this.$refs.lv_easyForm.open('添加积分配置', this.pocket.deepCopy(lv_form), data => {
					this.api.add_score_level(data).then(({ success }) => {
						if (success) {
							this.getConfig()
							this.$refs.lv_easyForm.onClose()
						}
					})
				})
			},
			onLvEdit(item, index) {
				const form = this.pocket.deepCopy(lv_form)
				form.fields.limit = item.limit
				this.$refs.lv_easyForm.open('修改积分配置', form, data => {
					this.api.edit_score_level(data, index).then(({ success }) => {
						if (success) {
							this.getConfig()
							this.$refs.lv_easyForm.onClose()
						}
					})
				})
			},
			onLvDel(item, index) {
				this.api.del_score_level(index).then(({ success }) => {
					if (success) {
						this.getConfig()
						this.$refs.lv_easyForm.onClose()
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.warp {
		position: relative;
		.delete {
			margin-left: 20rpx;
		}
	}
</style>
