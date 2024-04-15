import Image from 'next/image'

export const Content = () => {
  return (
    <>
      <div className="content_main">
        <div className="inner">
          <div className="form_custom">
            <h2 className="ttl_main fz-18">
              <span>
                <strong className="icon sz-24 icon-color-white flex-shrink">
                  <i className="icon-user"></i>
                </strong>
                THÔNG TIN NGƯỜI DÙNG
              </span>
            </h2>
            <form className="mt-32" action="">
              <div className="row flex flex-center gapy-60 flex-col lg:flex-row ">
                <div className="col-7 col-md-6 col-lg-4 mx-auto lg:mx-0 flex-[33%]">
                  <div className="avatar mx-auto flex-srink  aspect-square min-w-[280px] lg:min-w-[300px] xl:min-w-[380px]">
                    <div className="images ">
                      <div className="imgDrop ">
                        <Image
                          src="/images/avt/6.jpg"
                          alt="image alt"
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-auto h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 col-lg-8 form_content flex-[66%]">
                  <div className="input-group">
                    <div className="wrap-input">
                      <input
                        className="form-control transition rounded-md"
                        type="text"
                        value=""
                        placeholder=""
                        required
                      />
                      <label>Username</label>
                      <span className="validation">Text err</span>
                    </div>
                  </div>
                  <div className="row flex flex-col lg:flex-row">
                    <div className="col-12 col-xl-6 w-full">
                      <div className="input-group">
                        <div className="wrap-input">
                          <input
                            className="form-control transition rounded-md"
                            type="text"
                            value=""
                            placeholder=""
                            required
                          />
                          <label>Phone</label>
                          <span className="validation">Text err</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-xl-6 w-full">
                      <div className="input-group">
                        <div className="wrap-input">
                          <input
                            className="form-control transition rounded-md"
                            type="text"
                            value=""
                            placeholder=""
                            required
                          />
                          <label>Password</label>
                          <span className="validation">Text err</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group_select_avater">
                    <label className="label_select_avt">
                      Change Profile Avatar
                    </label>
                    <div className="select_avt mt-8 flex flex-wrap flex-grow">
                      <div className="group_item">
                        <input type="radio" name="selectAvt" id="selectAv1" />
                        <label htmlFor="selectAv1">
                          <div className="images">
                            <div className="imgDrop ratio_1_1">
                              <Image
                                src="/images/avt/1.jpg"
                                alt="image alt"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-full object-cover"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="group_item">
                        <input type="radio" name="selectAvt" id="selectAv2" />
                        <label htmlFor="selectAv2">
                          <div className="images">
                            <div className="imgDrop ratio_1_1">
                              <Image
                                src="/images/avt/2.jpg"
                                alt="image alt"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-full object-cover"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="group_item">
                        <input type="radio" name="selectAvt" id="selectAv3" />
                        <label htmlFor="selectAv3">
                          <div className="images">
                            <div className="imgDrop ratio_1_1">
                              <Image
                                src="/images/avt/3.jpg"
                                alt="image alt"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-full object-cover"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="group_item">
                        <input type="radio" name="selectAvt" id="selectAv4" />
                        <label htmlFor="selectAv4">
                          <div className="images">
                            <div className="imgDrop ratio_1_1">
                              <Image
                                src="/images/avt/4.jpg"
                                alt="image alt"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-full object-cover"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="group_item">
                        <input type="radio" name="selectAvt" id="selectAv5" />
                        <label htmlFor="selectAv5">
                          <div className="images">
                            <div className="imgDrop ratio_1_1">
                              <Image
                                src="/images/avt/5.jpg"
                                alt="image alt"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-full object-cover"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="group_item">
                        <input type="radio" name="selectAvt" id="selectAv6" />
                        <label htmlFor="selectAv6">
                          <div className="images">
                            <div className="imgDrop ratio_1_1">
                              <Image
                                src="/images/avt/6.jpg"
                                alt="image alt"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-full object-cover"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="group_item">
                        <input type="radio" name="selectAvt" id="selectAv7" />
                        <label htmlFor="selectAv7">
                          <div className="images">
                            <div className="imgDrop ratio_1_1">
                              <Image
                                src="/images/avt/7.jpg"
                                alt="image alt"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-full object-cover"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="group_item">
                        <input type="radio" name="selectAvt" id="selectAv8" />
                        <label htmlFor="selectAv8">
                          <div className="images">
                            <div className="imgDrop ratio_1_1">
                              <Image
                                src="/images/avt/8.jpg"
                                alt="image alt"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-full object-cover"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="group_item">
                        <input type="radio" name="selectAvt" id="selectAv9" />
                        <label htmlFor="selectAv9">
                          <div className="images">
                            <div className="imgDrop ratio_1_1">
                              <Image
                                src="/images/avt/9.jpg"
                                alt="image alt"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-full object-cover"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      <div className="group_item">
                        <input type="radio" name="selectAvt" id="selectAv10" />
                        <label htmlFor="selectAv10">
                          <div className="images">
                            <div className="imgDrop ratio_1_1">
                              <Image
                                src="/images/avt/10.jpg"
                                alt="image alt"
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="w-auto h-full object-cover"
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div className="footing flex flex-end gap-8">
              <button className="btn_main">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
